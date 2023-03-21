import React from "react"
import { useEffect, useState, useRef } from "react"

import * as Types from "./types/filter"

type FilterKey =
    | "brightness"
    | "saturate"
    | "contrast"
    | "blur"
    | "sepia"
    | "grayscale"
    | "hue-rotate"

type DefaultImageStyles = {
    brightness: { value: number; prefix: "%" }
    saturate: { value: number; prefix: "%" }
    contrast: { value: number; prefix: "%" }
    blur: { value: number; prefix: "px" }
    sepia: { value: number; prefix: "%" }
    grayscale: { value: number; prefix: "%" }
    "hue-rotate": { value: number; prefix: "deg" }
}

const FILTERS = {} as DefaultImageStyles

type Filters = {
    [key in FilterKey]: string
}

const initialFilters = {} as DefaultImageStyles

export default function Filter({
    photo,
    canvas,
    canvasContext,
    renderImage,
}: Types.DefaultProps) {
    const [filters, setFilters] = useState(initialFilters)
    const [selectedFilter, setSelectedFilter] = useState<HTMLElement | null>(
        null,
    )

    const editorContainerRef = useRef<any>(null)
    const slider = useRef<any>(null)

    useEffect(() => {
        if (editorContainerRef.current) {
            const brightness =
                editorContainerRef.current.querySelector("span[data-filter]")
            setSelectedFilter(brightness)
            selectFilter({ currentTarget: brightness })
        }

        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (canvas && canvasContext && photo) {
            renderImage(generateFilters())
        }
        // eslint-disable-next-line
    }, [filters])

    function selectFilter({ currentTarget }: any): void {
        " Assigns a filter style to the slider for event effects to take place"

        if (
            selectedFilter &&
            selectedFilter.getAttribute("data-filter") ===
                currentTarget.getAttribute("data-filter")
        )
            return

        if (slider.current) {
            slider.current.parentNode.classList.remove("hide")
            currentTarget.classList.add("active")
            selectedFilter?.classList.remove("active")
            setSelectedFilter(currentTarget)

            slider.current.max = currentTarget.getAttribute("data-max")
            slider.current.min = currentTarget.getAttribute("data-min")
            slider.current.value = currentTarget.getAttribute("data-value")
        }
    }

    function handleSliderChange({ target }: any): void {
        " Updates the imageStyle variable "

        if (selectedFilter) {
            selectedFilter.setAttribute("data-value", target.value)

            const filterKey = selectedFilter.dataset.filter as FilterKey

            if (filterKey) {
                setFilters({
                    ...filters,
                    [filterKey]: {
                        value: selectedFilter.getAttribute("data-value"),
                        prefix: selectedFilter.getAttribute("data-unit"),
                    },
                })
            }
        }
    }

    function generateFilters(): string {
        " Iterates over a givin object and stringifies the key value pairs "

        if (!filters) return "none"

        let styles = ""

        for (const key of Object.keys(filters)) {
            const filterKey = key as FilterKey
            const property = filters[filterKey]
            styles += `${key}(${property.value}${property.prefix}) `
        }

        return styles.trim()
    }

    return (
        <div
            id="photoEditor"
            ref={editorContainerRef}
            className="flex flex-col justify-evenly py-2 mx-1"
        >
            <p
                className="typography text-center pb-2"
                style={{ textTransform: "capitalize" }}
            >
                {selectedFilter?.getAttribute("data-filter")}{" "}
                {Math.floor(slider.current?.value || 0.0)}
                {"%"}
            </p>
            <div className="_hide flex justify-center py-1">
                <input
                    style={{ width: "90%" }}
                    ref={slider}
                    type="range"
                    min={0}
                    max={200}
                    step="any"
                    onChange={handleSliderChange}
                />
            </div>

            <div className="flex justify-between mx-1">
                <span
                    data-filter="brightness"
                    data-unit="%"
                    data-index="0"
                    data-min="0"
                    data-max="200"
                    data-value="100"
                    onClick={selectFilter}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 0 24 24"
                        width="24px"
                    >
                        <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                    </svg>
                </span>
                <span
                    data-filter="saturate"
                    data-unit="%"
                    data-index="1"
                    data-min="0"
                    data-max="200"
                    data-value="100"
                    onClick={selectFilter}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 0 24 24"
                        width="24px"
                    >
                        <path d="M12,4.81L12,19c-3.31,0-6-2.63-6-5.87c0-1.56,0.62-3.03,1.75-4.14L12,4.81 M6.35,7.56L6.35,7.56C4.9,8.99,4,10.96,4,13.13 C4,17.48,7.58,21,12,21c4.42,0,8-3.52,8-7.87c0-2.17-0.9-4.14-2.35-5.57l0,0L12,2L6.35,7.56z" />
                    </svg>
                </span>
                <span
                    data-filter="hue-rotate"
                    data-unit="deg"
                    data-index="2"
                    data-min="0"
                    data-max="100"
                    data-value="0"
                    onClick={selectFilter}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 0 24 24"
                        width="24px"
                    >
                        <path d="M19.07 4.93l-1.41 1.41C19.1 7.79 20 9.79 20 12c0 4.42-3.58 8-8 8s-8-3.58-8-8c0-4.08 3.05-7.44 7-7.93v2.02C8.16 6.57 6 9.03 6 12c0 3.31 2.69 6 6 6s6-2.69 6-6c0-1.66-.67-3.16-1.76-4.24l-1.41 1.41C15.55 9.9 16 10.9 16 12c0 2.21-1.79 4-4 4s-4-1.79-4-4c0-1.86 1.28-3.41 3-3.86v2.14c-.6.35-1 .98-1 1.72 0 1.1.9 2 2 2s2-.9 2-2c0-.74-.4-1.38-1-1.72V2h-1C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10c0-2.76-1.12-5.26-2.93-7.07z" />
                    </svg>
                </span>
                <span
                    data-filter="sepia"
                    data-unit="%"
                    data-index="3"
                    data-min="0"
                    data-max="100"
                    data-value="0"
                    onClick={selectFilter}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 0 24 24"
                        width="24px"
                    >
                        <path d="M19 9l1.25-2.75L23 5l-2.75-1.25L19 1l-1.25 2.75L15 5l2.75 1.25L19 9zm-7.5.5L9 4 6.5 9.5 1 12l5.5 2.5L9 20l2.5-5.5L17 12l-5.5-2.5zM19 15l-1.25 2.75L15 19l2.75 1.25L19 23l1.25-2.75L23 19l-2.75-1.25L19 15z" />
                    </svg>
                </span>
                <span
                    data-filter="contrast"
                    data-unit="%"
                    data-index="4"
                    data-min="0"
                    data-max="200"
                    data-value="100"
                    onClick={selectFilter}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 0 24 24"
                        width="24px"
                    >
                        <path d="M20 15.31L23.31 12 20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69zM12 18V6c3.31 0 6 2.69 6 6s-2.69 6-6 6z" />
                    </svg>
                </span>
                <span
                    data-filter="blur"
                    data-unit="px"
                    data-index="5"
                    data-min="0"
                    data-max="25"
                    data-value="0"
                    onClick={selectFilter}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 0 24 24"
                        width="24px"
                    >
                        <path d="M6 13c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm0 4c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm0-8c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm-3 .5c-.28 0-.5.22-.5.5s.22.5.5.5.5-.22.5-.5-.22-.5-.5-.5zM6 5c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm15 5.5c.28 0 .5-.22.5-.5s-.22-.5-.5-.5-.5.22-.5.5.22.5.5.5zM14 7c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1zm0-3.5c.28 0 .5-.22.5-.5s-.22-.5-.5-.5-.5.22-.5.5.22.5.5.5zm-11 10c-.28 0-.5.22-.5.5s.22.5.5.5.5-.22.5-.5-.22-.5-.5-.5zm7 7c-.28 0-.5.22-.5.5s.22.5.5.5.5-.22.5-.5-.22-.5-.5-.5zm0-17c.28 0 .5-.22.5-.5s-.22-.5-.5-.5-.5.22-.5.5.22.5.5.5zM10 7c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1zm0 5.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm8 .5c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm0 4c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm0-8c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm0-4c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm3 8.5c-.28 0-.5.22-.5.5s.22.5.5.5.5-.22.5-.5-.22-.5-.5-.5zM14 17c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm0 3.5c-.28 0-.5.22-.5.5s.22.5.5.5.5-.22.5-.5-.22-.5-.5-.5zm-4-12c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0 8.5c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm4-4.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-4c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z" />
                    </svg>
                </span>
                <span
                    data-filter="grayscale"
                    data-unit="%"
                    data-index="6"
                    data-min="0"
                    data-max="100"
                    data-value="0"
                    onClick={selectFilter}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 0 24 24"
                        width="24px"
                    >
                        <path d="M12,22c5.52,0,10-4.48,10-10S17.52,2,12,2S2,6.48,2,12S6.48,22,12,22z M13,4.07c3.94,0.49,7,3.85,7,7.93s-3.05,7.44-7,7.93 V4.07z" />
                    </svg>
                </span>
            </div>
        </div>
    )
}
