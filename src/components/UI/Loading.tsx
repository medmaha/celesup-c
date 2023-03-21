import styles from "./loader.module.css"

type LoaderTypes = "spinner" | "bouncer" | "flip"

type LoadingProps = {
    text: string | null
    loader: LoaderTypes
}

export default function Loading({ text, loader }: LoadingProps) {
    return (
        <div
            tabIndex={0}
            className="w-full h-full flex justify-center items-center flex-col relative"
        >
            {loader === "spinner" && (
                <div className={styles.spinner}>
                    <div className="div"></div>
                    <div className="div"></div>
                </div>
            )}

            {loader === "bouncer" && (
                <div className={styles.bouncer}>
                    <div className="div"></div>
                    <div className="div"></div>
                    <div className="div"></div>
                </div>
            )}
            {loader === "flip" && (
                <div className={styles.square}>
                    <div className="div"></div>
                    <div className="div"></div>
                </div>
            )}
            {text && (
                <p className="mt-2 w-full text-center pt-4 opacity-75 animate-bounce text-lg font-semibold tracking-wide">
                    {text}
                </p>
            )}
        </div>
    )
}

Loading.defaultProps = {
    loader: {},
    text: "Loading",
}
