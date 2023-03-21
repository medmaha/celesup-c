import React from "react"
import Icon from "../../../components/UI/Icon"

export default function Premium() {
    return (
        <div className="bg-secondary rounded-lg text-white p-2 py-3 cursor-pointer text-center">
            <h3 className="flex justify-center">
                <button className="flex items-center gap-[.5rem]">
                    <div>
                        <Icon
                            name="star"
                            className="fill-white w-[2.5em] h-[2.5em]"
                        />
                    </div>
                    <div className="font-semibold text-xl leading-none_">
                        Upgrade to premium
                    </div>
                </button>
            </h3>
            <p className="prose text-center pt-1 w-full">
                Try premium now and experience the ultimate Celesup experience!
            </p>
        </div>
    )
}
