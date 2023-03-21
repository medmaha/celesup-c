export default function Trending() {
    return (
        <div
            className="w-full flex flex-col gap-[.5rem] cs-text-color cs-card mt-3 py-2 rounded-lg"
            id="TrendsWrapper"
        >
            <div className="px-4">
                <h2 className="font-semibold text-xl">Trends for you</h2>
            </div>
            {[1, 2, 3].map((user_id) => {
                return (
                    <span key={user_id}>
                        <Trend />
                    </span>
                )
            })}
        </div>
    )
}

function Trend(props) {
    const { category, name, tweets } = props

    return (
        <div
            className="flex flex-col gap-[5px] rounded-sm cursor-pointer sc-color px-4 
            hover:bg-card_light_muted dark:hover:bg-card_dark_muted width-full p-1"
        >
            <span className="leading-none cs-text-muted tertiary-text">
                {category}
            </span>
            <span className="leading-none font-semibold">{name}</span>
            <span className="leading-none  cs-text-muted tertiary-text">
                {tweets}
            </span>
        </div>
    )
}

Trend.defaultProps = {
    category: "trending",
    name: "Software Development",
    tweets: "125k posts",
}
