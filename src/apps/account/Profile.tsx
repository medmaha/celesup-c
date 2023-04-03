import Image from "next/image"
import { useContext, useEffect, useState } from "react"
import { GlobalContext } from "../../layouts/context"
import CSDateTime from "../../library/dateTime"
import CSTypography from "../../library/typography"
import { AuthUserProfile } from "./types"
import UpdateProfile from "./ProfileUpdate"

type Props = {
    data: AuthUserProfile
}

export default function Profile({ data }: Props) {
    const { user } = useContext(GlobalContext)
    const [profile, setProfile] = useState<AuthUserProfile>(data)
    const [update, toggleUpdate] = useState<boolean>(false)

    return (
        <>
            {update && (
                <UpdateProfile
                    updateProfile={() => {}}
                    profile={profile}
                    openUpdateModal={toggleUpdate}
                />
            )}
            <div className="block w-full h-full p-2 sm:p-6">
                <div className="block mx-auto max-w-[1100px] w-full h-full">
                    <div className="panels flex justify-center gap-4 pb-8">
                        <div className="panel-1 block overflow-hidden flex-1 sm:min-w-[450px] max-w-[650px] md:max-w-[750px] relative">
                            <div className="profile block tertiary-bg pb-8 rounded-lg overflow-hidden">
                                <div className="cover secondary-bg h-[190px] w-full overflow-hidden">
                                    <img
                                        style={{
                                            backgroundPosition: "top center",
                                        }}
                                        className="w-full h-[190px] object-cover"
                                        src={profile.cover_img}
                                        alt="user profile cover"
                                    />
                                </div>
                                <div className="avatar block">
                                    <div className="flex justify-between gap-4 flex-wrap px-4">
                                        <div
                                            style={{
                                                position: "absolute",
                                                left: "1em",
                                            }}
                                            className="image top-[100px] h-[130px] rounded-full w-[130px] border-[1px] cs-border"
                                        >
                                            <Image
                                                className="rounded-full"
                                                src={profile.avatar}
                                                width={130}
                                                height={130}
                                                alt="user profile avatar"
                                            />
                                        </div>
                                        <div className="h-4 w-[50px]"></div>
                                        <div className="client-action pt-4">
                                            {user &&
                                            !!(user.id === profile.id) ? (
                                                <button
                                                    onClick={() =>
                                                        toggleUpdate(
                                                            (prev) => !prev,
                                                        )
                                                    }
                                                    title="Edit profile"
                                                    className="bg-primary rounded-full w-10 h-10 inline-flex justify-center items-center leading-none"
                                                >
                                                    <span>
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="18"
                                                            height="18"
                                                            viewBox="0 0 18 18"
                                                        >
                                                            <path d="M2 12.88V16h3.12L14 7.12 10.88 4 2 12.88zm14.76-8.51c.33-.33.33-.85 0-1.18l-1.95-1.95c-.33-.33-.85-.33-1.18 0L12 2.88 15.12 6l1.64-1.63z" />
                                                        </svg>
                                                    </span>
                                                </button>
                                            ) : (
                                                <button className="bg-primary font-semibold rounded-md px-4 py-2">
                                                    + Connect
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="name px-4 max-w-[50ch] flex flex-col w-full">
                                    {profile.name && (
                                        <h2 className="w-[200px] text-xl font-bold leading-none">
                                            {profile.name}
                                        </h2>
                                    )}
                                    {profile.username && (
                                        <p className="w-full font-semibold tracking-wide">
                                            @{profile.username}
                                        </p>
                                    )}
                                </div>
                                <div className="about flex flex-col sm:flex-row mt-4 sm:mt-0 sm:items-center gap-4 justify-between px-4 w-full">
                                    {profile.biography && (
                                        <div className="info flex-1 max-w-[50ch] flex flex-col w-full">
                                            <p className="w-full secondary-text text-sm max-w-[50ch] mt-2 pb-1">
                                                {profile.biography}
                                            </p>
                                        </div>
                                    )}

                                    <div
                                        className={`account-type ${
                                            profile.biography
                                                ? "text-lg order-first sm:order-last"
                                                : "py-4 text-xl secondary-text"
                                        }`}
                                    >
                                        <h3 className="font-semibold leading-none">
                                            {CSTypography.capitalize(
                                                profile.account_type,
                                            )}
                                        </h3>
                                        {!profile.email_privacy && (
                                            <p className="inline-flex text-sm gap-1 items-center flex-wrap">
                                                <b>Public email:</b>
                                                <span className="secondary-text">
                                                    {profile.public_email}
                                                </span>
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="name px-4 max-w-[50ch] flex flex-col w-full">
                                    {profile.city && (
                                        <p className="w-full text-secondary leading-none text-sm inline-flex gap-2 items-center mt-2 capitalize">
                                            <span className="leading-none">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="18"
                                                    height="18"
                                                    fill="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                                                </svg>
                                            </span>
                                            <span>{profile.city}</span>
                                        </p>
                                    )}
                                    <p className="w-full inline-flex gap-2 leading-none items-center text-sm max-w-[50ch] mt-1">
                                        <span className="leading-none">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="18"
                                                height="18"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z" />
                                            </svg>
                                        </span>
                                        <span>
                                            <b>Date Joined</b>.{" "}
                                            <span className="font-light">
                                                {new CSDateTime(
                                                    profile.date_joined,
                                                ).format()}
                                            </span>
                                        </span>
                                    </p>
                                </div>
                                <div className="stats px-4 leading-none min-h-[50px] w-full mt-8">
                                    <div className="w-full flex items-center leading-none h-full shadow secondary-bg rounded-xl px-8">
                                        <div className="flex items-center py-2 h-full w-full justify-around flex-wrap">
                                            <div className="inline-flex gap-1">
                                                <span className="text-sm font-bold">
                                                    350
                                                </span>
                                                <span className="text-sm font-light">
                                                    posts
                                                </span>
                                            </div>
                                            <div className="inline-flex gap-1">
                                                <span className="text-sm font-bold">
                                                    72
                                                </span>
                                                <span className="text-sm font-light">
                                                    shared
                                                </span>
                                            </div>
                                            <div className="inline-flex gap-1">
                                                <span className="text-sm font-bold">
                                                    900
                                                </span>
                                                <span className="text-sm font-light">
                                                    friends
                                                </span>
                                            </div>
                                            <div className="inline-flex gap-1">
                                                <span className="text-sm font-bold">
                                                    1.2k
                                                </span>
                                                <span className="text-sm font-light">
                                                    followers
                                                </span>
                                            </div>

                                            <div className="inline-flex gap-1">
                                                <span className="text-sm font-bold">
                                                    241
                                                </span>
                                                <span className="text-sm font-light">
                                                    followings
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="activities mt-8">
                                <h2 className="text-xl font-bold tracking-wider w-[170px ">
                                    <span className="text-secondary">#</span>
                                    Activities
                                </h2>

                                <div className="activities mt-4 rounded-md">
                                    <h2 className="h-[7em] w-full bg-gray-400"></h2>
                                </div>
                            </div>
                        </div>
                        <div
                            className="panel-2 shrink hidden md:block flex-1 
                        min-w-[250px] max-w-[calc(1100px-750px)] rounded-t-md"
                        >
                            <div className="premium p-4 rounded-xl secondary-bg shadow-md">
                                <h2 className="text-center pb-2 text-lg font-semibold">
                                    Try Premium Now
                                </h2>
                                <p className="text-sm text-center tracking-wide ">
                                    Start your 1 month{" "}
                                    <b>
                                        <span className="text-secondary">
                                            Free
                                        </span>{" "}
                                    </b>{" "}
                                    trial Journey now, Cancel anytime.
                                    We&apos;ll send you a reminder 7 days before
                                    your trial ends.
                                </p>
                                <div className="flex justify-center mt-4">
                                    <button className="bg-primary rounded-xl font-semibold text-lg px-4 py-2">
                                        Try For Free
                                    </button>
                                </div>
                            </div>
                            <div className="block tertiary-bg mt-6 w-full p-2">
                                <div className="">
                                    <h2 className="text-lg tracking-wider secondary-text">
                                        <button className="underline">
                                            Create a custom profile URL
                                        </button>
                                    </h2>
                                    <p className="text-sm tertiary-text">
                                        Personalize the URL for your profile.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
