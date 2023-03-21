import React from "react"
import PremiumSuggestion from "./premium"
import FollowingSuggestions from "./follow"
import TrendingSuggestions from "./trending"

export default function Suggestions() {
    return (
        <div className="mt-5 w-full">
            <PremiumSuggestion />
            <FollowingSuggestions />
            <TrendingSuggestions />
        </div>
    )
}
