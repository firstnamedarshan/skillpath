import type { Course, CountryCode } from "./courseTypes.ts"

const usdFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
})

const inrFormatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
})

export function getPriceInMinorUnits(
    course: Course,
    countryCode: CountryCode
): number {
    if (countryCode === "US") {
        return course.priceUsdCents
    }

    return course.pricePaise
}

export function formatPrice(course: Course, countryCode: CountryCode): string {
    if (countryCode === "US") {
        return usdFormatter.format(course.priceUsdCents / 100)
    }

    return inrFormatter.format(course.pricePaise / 100)
}
