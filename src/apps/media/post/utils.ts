import { CreateMediaForm } from "../../../redux/types"
import { InitialConfig } from "./types"

export function createFileFromDataUrl(
    dataURL: string,
): Promise<{ file: File; url: string | ArrayBuffer }> {
    const MIME_TYPE = dataURL.split(";")[0].split(":")[1]

    const ascii_Char = atob(dataURL.split(",")[1])
    const ascii_CodeArray = new Uint8Array(ascii_Char.length)

    let i = ascii_Char.length
    while (i--) {
        ascii_CodeArray[i] = ascii_Char.charCodeAt(i)
    }

    const file = new File(
        [ascii_CodeArray],
        `photo-${ascii_CodeArray.byteLength}_eDT.${MIME_TYPE.split("/")[1]}`,
        {
            type: MIME_TYPE,
        },
    )

    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => {
            return resolve({ file, url: reader.result?.toString()! })
        }
        reader.readAsDataURL(file)
    })
}

export function checkFormValidation(form: CreateMediaForm): boolean {
    let valid = false
    for (const field in form) {
        //
        if (field === "caption" && form.caption!.length > 4) valid = true
        else if (field === "excerpt" && form.excerpt!.length > 4) valid = true
        //
        // else if (field === "video" && !!form.media?.audio) valid = true
        // else if (field === "audio" && !!form.media?.video) valid = true
        else if (field === "picture" && !!form.media?.picture) valid = true

        if (valid) break
        continue
    }
    return valid
}

export const DefaultConfig: InitialConfig = {
    seeBtn: false,
    editBtn: false,
    backBtn: false,
    closeBtn: true,
    actionBtn: false,
    actionText: "Create",
    textTitle: "Create Post",

    METHODS: {
        onBackBtnClicked: (ev: any) => {},
        onEditBtnClicked: (ev: any) => {},
        onCloseBtnClicked: (ev: any) => {},
        onActionBtnClicked: (ev: any) => {},
        onDefaultBtnClicked: (ev: any) => {},
    },
}
