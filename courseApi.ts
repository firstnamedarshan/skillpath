import type { Course, CountryApiResponse, CountryCode } from "./courseTypes.ts"

const COURSES_API_URL =
    "https://syncsphere-hiv6.onrender.com/assignment/course-data"
const COUNTRY_CODE_API_URL =
    "https://syncsphere-hiv6.onrender.com/assignment/country-code"

export async function fetchCourses(): Promise<Course[]> {
    const response = await fetch(COURSES_API_URL)

    if (!response.ok) {
        throw new Error("The courses could not be loaded")
    }

    const courses: Course[] = await response.json()

    if (!Array.isArray(courses)) {
        throw new Error("The course API returned an invalid response")
    }

    return courses
}

export async function fetchCountryCode(): Promise<CountryCode> {
    const response = await fetch(COUNTRY_CODE_API_URL)

    if (!response.ok) {
        throw new Error("The country could not be detected")
    }

    const countryResponse: CountryApiResponse = await response.json()
    const countryCode = countryResponse.country_code

    if (countryCode !== "IN" && countryCode !== "US") {
        throw new Error("The country API returned an unsupported country code")
    }

    return countryCode
}
