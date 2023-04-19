import Link from "next/link"
import React from "react"
import Icon from "../../../components/UI/Icon"
import UserCard from "../../../components/UI/UserCard"
import CSTypography from "../../../library/typography"

export default function Headers({ data, isChild, menu = true }: any) {
    return (
        <div className="flex mobile:flex-wrap gap-2 justify-between items-start w-full">
            <div className="flex flex-col">
                <div className="flex items-center gap-2">
                    <h2 className="tracking-wide font-semibold min-w-fit">
                        <UserCard
                            btnElement={
                                <span className="hover:underline pb-[2px] inline-block">
                                    {data.author.name ||
                                        CSTypography.capitalize(
                                            data.author.username,
                                        )}
                                </span>
                            }
                            author={data.author}
                        />
                    </h2>

                    <div className="flex items-center secondary-text gap-1 min-w-fit">
                        {data.child ? (
                            <div className="inline-flex items-center gap-1">
                                <span className="secondary-text font-bold text-base leading-none pb-2 inline-flex items-center">
                                    .
                                </span>
                                <p className="text-sm tertiary-text">
                                    Reposted this
                                </p>
                            </div>
                        ) : (
                            <UserCard
                                btnElement={
                                    <span className="transition hover:text-[var(--primary)]">
                                        @{data.author.username?.toLowerCase()}
                                    </span>
                                }
                                author={data.author}
                            />
                        )}
                    </div>
                </div>
                <div
                    className="flex mobile:hidden items-center"
                    title={data.created_at}
                >
                    <p className="text-sm tertiary-text truncate w-full">
                        {data.created_at}
                    </p>
                </div>
            </div>
            {!isChild && (
                <div className="flex flex-col sm:pr-1 sm:flex-row sm:gap-2">
                    {menu && (
                        <div className="justify-end flex items-center leading-[20px]">
                            <button
                                className="cursor-pointer rounded-full active:outline
                            outline-slate-500 p-1 outline-1 leading-[1rem]"
                            >
                                <Icon
                                    name={"ellipsesHorizontal"}
                                    className="w-[.5rem]_"
                                />
                            </button>
                        </div>
                    )}
                    <div
                        className="hidden mobile:flex items-center sm:order-first"
                        title={data.created_at}
                    >
                        <p className="text-sm tertiary-text truncate w-full leading-[1rem]">
                            {data.created_at}
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
}
