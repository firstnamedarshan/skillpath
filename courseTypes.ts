export type Course = {
    courseName: string
    courseCode: string
    description: string
    mainCategory: string
    shortCourse: string
    courseType: string
    pricePaise: number
    priceUsdCents: number
    refundable: boolean
}

export type CountryCode = "IN" | "US"

export type CountryApiResponse = {
    country_code?: string
}

export type CourseLoadState = "loading" | "success" | "error"

export type CourseSortOption =
    | "default"
    | "price-low-to-high"
    | "price-high-to-low"
