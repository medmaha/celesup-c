export type DefaultProps = {
    photo: HTMLImageElement | null
    canvasContext: {} | null
    canvas: HTMLCanvasElement | null
    renderImage: (filters: string) => void
}

export type ReduxStoreState = DefaultProps
