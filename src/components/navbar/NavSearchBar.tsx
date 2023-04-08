import React, {
    useCallback,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from "react"
import Input from "../UI/Input"
import Icon from "../UI/Icon"
import { celesupBackendApi } from "../../axiosInstance"
import { AuthUser } from "../../types/user"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import Loading from "../UI/Loading"

export default function SearchBar() {
    const [isFocus, setIsFocus] = useState(false)
    const [pending, togglePending] = useState(false)
    const [searchResults, updateResults] = useState<any[] | null>(null)

    const formRef = useRef<HTMLFormElement | null>(null)
    const inputRef = useRef<HTMLInputElement | null>(null)

    const router = useRouter()
    const resultsRef = useRef<HTMLDivElement | null>(null)

    useLayoutEffect(() => {
        const input = inputRef.current!
        if (isFocus && input.value.length < 1 && searchResults) {
            updateResults(null)
        }
    }, [isFocus])

    useLayoutEffect(() => {
        const formElm = formRef.current!
        const input: HTMLInputElement =
            formElm.querySelector("input.search-bar")!
        inputRef.current = input
    }, [])

    function handleDomClick(ev: any) {
        const target = ev.target

        if (target === formRef.current || target.closest("[data-search-form]"))
            return
        setIsFocus(false)
    }

    useEffect(() => {
        document.addEventListener("click", handleDomClick)
        inputRef.current?.addEventListener("input", handleQueryChanged)
        return () => {
            document.removeEventListener("click", handleDomClick)
            inputRef.current?.removeEventListener("input", handleQueryChanged)
        }
    }, [])

    const makeDebounceRequest = useCallback(
        debounce(async (query: string) => {
            if (!query) return updateResults(null)
            try {
                const { data } = await celesupBackendApi({
                    url: "/search_query",
                    method: "post",
                    data: { query },
                })
                updateResults(data)
            } catch (error: any) {
                console.error(error.message)
            }
            togglePending(false)
        }, 700),
        [],
    )

    const handleQueryChanged = useCallback(
        ({ target }: any) => {
            if (pending) return

            const query: string = target.value?.toLowerCase()?.trim()

            if (!query.length) {
                updateResults(null)
            } else {
                togglePending(true)
                makeDebounceRequest(query)
            }
        },
        [makeDebounceRequest],
    )

    function debounce(callback: any, delay: number = 700) {
        let timeout: any
        return (...args: any) => {
            clearTimeout(timeout)
            timeout = setTimeout(() => {
                callback(...args)
            }, delay)
        }
    }

    return (
        <form
            onClick={(ev) => {
                if (ev.target === inputRef.current) {
                    setIsFocus(true)
                    return
                }
                const target = ev.target as HTMLElement
                if (
                    target.closest("[data-q-results]") ||
                    target === resultsRef.current
                ) {
                    setIsFocus(true)
                    return
                }
                setIsFocus(false)
            }}
            ref={formRef}
            data-search-form
            method="get"
            className="w-full max-w-[450px] relative flex-1"
        >
            <div className="w-full inset overflow-hidden focus-within:outline-[var(--primary-light)] focus-within:outline-[3px] z-[105px] cs-outline outline-2 rounded-sm">
                <Input
                    className={
                        "search-bar w-full transition focus:pl-[35px] focus:outline-none bg-transparent outline-none sm:min-w-[300px] pl-[32px]"
                    }
                />

                <div className="absolute hover:bg-gray-400 hover:bg-opacity-30 bg-opacity-30 bg-gray-300 h-full w-[30px] left-0 top-0">
                    <div className="flex h-full w-full items-center justify-center">
                        <button
                            type="button"
                            onClick={(ev: any) => {
                                ev.preventDefault()
                                // setIsFocus(true)
                                // handleQueryChanged({
                                //     target:inputRef
                                // })
                            }}
                        >
                            <Icon
                                name={"search"}
                                className="fill-[var(--text-tertiary)]"
                            />
                        </button>
                    </div>
                </div>

                {isFocus && (
                    <div className="absolute z-20 h-full w-full left-0 top-[calc(100%+2px)]">
                        <div className="block relative h-max shadow-xl rounded-b-xl overflow-hidden overflow-y-auto tertiary-bg w-full min-h-[120px] max-h-[450px] shadow-bg">
                            {pending && (
                                <div className="absolute block top-0 left-0 h-full w-full z-10 bg-gray-800 bg-opacity-70">
                                    <div className="block w-full h-full py-2">
                                        <Loading loader="spinner" text={null} />
                                    </div>
                                </div>
                            )}
                            {!searchResults ? (
                                <div className="flex w-full items-center justify-center h-full p-2 min-h-[120px]">
                                    <p
                                        data-hint-text
                                        className="max-w-[35ch] text-lg tracking-wide text-center "
                                    >
                                        Try searching for people, topics or
                                        keywords
                                    </p>
                                </div>
                            ) : inputRef.current?.value &&
                              !!searchResults?.length ? (
                                <div
                                    ref={resultsRef}
                                    data-q-results
                                    className="px-1 py-3 sm:px-1 sm:py-5 flex flex-col gap-2 w-full h-full"
                                >
                                    {searchResults.map((result, idx) => {
                                        return (
                                            <div
                                                className="block p-1 w-full h-full bg-sky-500 
                                                bg-opacity-0 transition hover:bg-opacity-20 rounded-md"
                                                key={idx}
                                            >
                                                <button
                                                    type="button"
                                                    onClick={async (ev) => {
                                                        ev.preventDefault()
                                                        await router.push(
                                                            "/" +
                                                                result.text.toLowerCase(),
                                                        )
                                                        setIsFocus(false)
                                                    }}
                                                    className="flex gap-2 items-center w-full"
                                                >
                                                    <span className="inline-block gap-2 min-w-max h-[40px] w-[40px] rounded-full cs-border border-[1px]">
                                                        <Image
                                                            height={40}
                                                            width={40}
                                                            src={result.avatar}
                                                            alt={result.object}
                                                            className="rounded-full"
                                                        />
                                                    </span>
                                                    <div className="inline-flex items-start flex-col gap-1">
                                                        {result.name && (
                                                            <span className="leading-none tracking-wide">
                                                                {result.name}
                                                            </span>
                                                        )}
                                                        <span className="leading-none secondary-text ">
                                                            @
                                                            {result.text.toLowerCase()}
                                                        </span>
                                                    </div>
                                                </button>
                                            </div>
                                        )
                                    })}
                                </div>
                            ) : (
                                <p className="flex w-full min-h-[120px]  mx-auto h-full p-2 items-center justify-center text-center">
                                    {!!inputRef.current?.value ? (
                                        <span
                                            data-hint-text
                                            className="max-w-[35ch] inline-block text-lg tracking-wide animate-pulse"
                                        >
                                            Oops no results matches your query{" "}
                                            <b className="text-primary">
                                                {`"${inputRef.current?.value}"`}
                                            </b>
                                        </span>
                                    ) : (
                                        <span
                                            data-hint-text
                                            className="max-w-[35ch] inline-block text-lg tracking-wide "
                                        >
                                            Try searching for people, topics or
                                            keywords
                                        </span>
                                    )}
                                </p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </form>
    )
}
