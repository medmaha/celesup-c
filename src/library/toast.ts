import internal from "stream"
import Toast from "../components/UI/Toast"
import { capitalize } from "./texts"

type InitOptions = {
    canClose?: boolean
    position?: string
    autoClose?: number
    showProgress?: boolean
    text: string
    className?: string
}

type Attrs = "canClose" | "position" | "autoClose" | "showProgress" | "text"

class CSToast {
    private toastElement: HTMLElement
    private visibleSince: number
    private autoCloseTimeout: any
    private progressInterval: any
    private initOptions: InitOptions
    private removeFuncBind: () => void | null

    constructor(options: InitOptions = DEFAULT_OPTIONS) {
        this.visibleSince = 0

        this.toastElement = document.createElement("div")
        this.toastElement.classList.add("toast")

        this.removeFuncBind = this.remove.bind(this)

        const data = { ...DEFAULT_OPTIONS, ...options }

        this.initOptions = data
        Object.entries(data).forEach(([key, value]) => {
            const cls = this as any
            cls[key] = value
        })
    }

    set text(value: string) {
        this.toastElement.innerHTML = capitalize(value)
    }
    set className(value: string) {
        if (value.length) this.toastElement.classList.add(value)
    }

    set position(value: string) {
        console.log("position")
        const selector = `.toast-container[data-position="${value}"]`

        const toastContainer =
            document.querySelector(selector) || createToastContainer(value)

        this.toastElement.id =
            "toast-" + String(toastContainer.childNodes.length + Math.random())

        toastContainer.append(this.toastElement)

        requestAnimationFrame(() => {
            this.toastElement.classList.add("show")
            this.toastElement.addEventListener("animationend", () => {
                this.toastElement.addEventListener("click", this.removeFuncBind)
            })
        })
    }

    set canClose(value: boolean) {
        if (!value) {
            this.initOptions["autoClose"] = 0
            return
        }
    }

    set autoClose(value: number) {
        if (!value) {
            this.initOptions["canClose"] = false
            return
        }

        if (this.autoCloseTimeout !== null) {
            this.initOptions["autoClose"] = value

            clearTimeout(this.autoCloseTimeout)
        }

        this.autoCloseTimeout = setTimeout(this.removeFuncBind, value)
    }

    set showProgress(value: boolean) {
        if (!value || !this.initOptions.canClose) return

        this.toastElement.style.setProperty("--progress", "1")
        this.toastElement.classList.add("can-close")

        let lastTimeUpdate = new Date()

        this.progressInterval = setInterval(() => {
            //
            this.visibleSince += new Date().valueOf() - lastTimeUpdate.valueOf()

            this.toastElement.style.setProperty(
                "--progress",
                String(
                    1 - this.visibleSince / (this.initOptions?.autoClose || 1),
                ),
            )

            lastTimeUpdate = new Date()
        }, 10)
    }

    remove() {
        if (!this.initOptions.canClose || !this.toastElement) return

        if (this.autoCloseTimeout) clearTimeout(this.autoCloseTimeout)

        clearInterval(this.progressInterval)

        requestAnimationFrame(() => {
            this.toastElement.classList.add("remove")
            this.toastElement.classList.remove("show")

            this.toastElement.addEventListener("animationend", () => {
                setTimeout(() => {
                    const container = this.toastElement.parentElement
                    if (container) {
                        this.toastElement.remove()
                        if (container?.hasChildNodes()) return
                        container.remove()
                    }
                }, 30)
            })
        })
    }

    update(options: InitOptions) {
        // Object.entries(options).forEach(([key, value]) => {
        //     this.initOptions[key] = value
        // })
    }
}

function createToastContainer(position: string) {
    const toastContainer = document.createElement("div")
    toastContainer.classList.add("toast-container")
    toastContainer.dataset.position = position
    document.body.appendChild(toastContainer)
    return toastContainer
}

const DEFAULT_OPTIONS = {
    canClose: true,
    position: "top-center",
    autoClose: 6000,
    text: "",
    showProgress: true,
    className: "",
}

export default CSToast
