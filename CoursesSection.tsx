import * as React from "react"
import { addPropertyControls, ControlType } from "framer"
import CourseCard from "./courseCard/CourseCard.tsx"
import CourseSkeleton from "./courseCard/CourseSkeleton.tsx"
import { courseCardStyles } from "./courseCard/CourseCard_styles.ts"
import { courseSkeletonStyles } from "./courseCard/CourseSkeleton_styles.ts"
import { fetchCourses, fetchCountryCode } from "./courseApi.ts"
import type {
    Course,
    CountryCode,
    CourseLoadState,
    CourseSortOption,
} from "./courseTypes.ts"
import { courseStyles } from "./courseStyles.ts"
import { getPriceInMinorUnits } from "./priceUtils.ts"

const DEFAULT_ACCENT_COLOR = "#4C5CFF"
const DEFAULT_CARD_RADIUS = 12
const DEFAULT_CARD_GAP = 20
const DEFAULT_SECTION_PADDING = 20
const DEFAULT_CARD_PADDING = 17
const DEFAULT_COUNTRY_CODE: CountryCode = "IN"
const SKELETON_CARD_NUMBERS = [1, 2, 3, 4, 5, 6]

const allCourseStyles = courseStyles + courseCardStyles + courseSkeletonStyles

function filterCourses(
    courses: Course[],
    searchQuery: string,
    selectedCategory: string
): Course[] {
    const query = searchQuery.trim().toLowerCase()

    return courses.filter((course) => {
        const matchesCategory =
            selectedCategory === "all" ||
            course.mainCategory.trim() === selectedCategory

        const searchableText = [
            course.courseName,
            course.shortCourse,
            course.mainCategory,
            course.courseType,
        ]
            .join(" ")
            .toLowerCase()

        const matchesSearch = query === "" || searchableText.includes(query)

        return matchesCategory && matchesSearch
    })
}

function sortCoursesByPrice(
    courses: Course[],
    countryCode: CountryCode,
    sortOption: CourseSortOption
): Course[] {
    if (sortOption === "default") {
        return courses
    }

    return [...courses].sort((firstCourse, secondCourse) => {
        const firstPrice = getPriceInMinorUnits(firstCourse, countryCode)
        const secondPrice = getPriceInMinorUnits(secondCourse, countryCode)

        if (sortOption === "price-low-to-high") {
            return firstPrice - secondPrice
        }

        return secondPrice - firstPrice
    })
}

function getVisibleCourses(
    courses: Course[],
    searchQuery: string,
    selectedCategory: string,
    countryCode: CountryCode,
    sortOption: CourseSortOption
): Course[] {
    const filteredCourses = filterCourses(
        courses,
        searchQuery,
        selectedCategory
    )

    return sortCoursesByPrice(filteredCourses, countryCode, sortOption)
}

function getCourseCategories(courses: Course[]): string[] {
    const categories = courses.map((course) => course.mainCategory.trim())

    return [...new Set(categories)].sort()
}

type CoursesSectionProps = {
    accentColor?: string
    cardRadius?: number
    cardGap?: number
    sectionPadding?: number
    cardPadding?: number
}

/**
 * @framerSupportedLayoutWidth any
 * @framerSupportedLayoutHeight auto
 */
export default function CoursesSection({
    accentColor = DEFAULT_ACCENT_COLOR,
    cardRadius = DEFAULT_CARD_RADIUS,
    cardGap = DEFAULT_CARD_GAP,
    sectionPadding = DEFAULT_SECTION_PADDING,
    cardPadding = DEFAULT_CARD_PADDING,
}: CoursesSectionProps) {
    const [loadState, setLoadState] = React.useState<CourseLoadState>("loading")
    const [courses, setCourses] = React.useState<Course[]>([])
    const [countryCode, setCountryCode] =
        React.useState<CountryCode>(DEFAULT_COUNTRY_CODE)
    const [showCountryFallbackNotice, setShowCountryFallbackNotice] =
        React.useState(false)
    const [retryCount, setRetryCount] = React.useState(0)
    const [searchQuery, setSearchQuery] = React.useState("")
    const [selectedCategory, setSelectedCategory] = React.useState("all")
    const [sortOption, setSortOption] =
        React.useState<CourseSortOption>("default")

    const courseCategories = React.useMemo(
        () => getCourseCategories(courses),
        [courses]
    )

    const visibleCourses = React.useMemo(
        () =>
            getVisibleCourses(
                courses,
                searchQuery,
                selectedCategory,
                countryCode,
                sortOption
            ),
        [courses, selectedCategory, searchQuery, countryCode, sortOption]
    )

    React.useEffect(() => {
        async function loadCourses() {
            setLoadState("loading")
            setCourses([])
            setCountryCode(DEFAULT_COUNTRY_CODE)
            setShowCountryFallbackNotice(false)
            setSelectedCategory("all")

            try {
                const [loadedCourses, detectedCountryCode] = await Promise.all([
                    fetchCourses(),
                    fetchCountryCode().catch(() => null),
                ])

                setCourses(loadedCourses)

                if (detectedCountryCode) {
                    setCountryCode(detectedCountryCode)
                } else {
                    setShowCountryFallbackNotice(true)
                }

                setLoadState("success")
            } catch {
                setLoadState("error")
            }
        }

        loadCourses()
    }, [retryCount])

    function handleRetry(): void {
        setRetryCount((currentRetryCount) => currentRetryCount + 1)
    }

    function switchToUsd(): void {
        setCountryCode("US")
        setShowCountryFallbackNotice(false)
    }

    function renderContent() {
        if (loadState === "loading") {
            return (
                <>
                    <div className="spc-summary" role="status">
                        Loading courses...
                    </div>

                    <div className="spc-grid">
                        {SKELETON_CARD_NUMBERS.map((number) => (
                            <CourseSkeleton key={number} />
                        ))}
                    </div>
                </>
            )
        }

        if (loadState === "error") {
            return (
                <div className="spc-state" role="alert">
                    <div className="spc-state-icon">!</div>
                    <h3>We couldn&apos;t load the courses.</h3>
                    <p>Please try again.</p>
                    <button type="button" onClick={handleRetry}>
                        Try again
                    </button>
                </div>
            )
        }

        if (courses.length === 0) {
            return (
                <div className="spc-state">
                    <div className="spc-state-icon">0</div>
                    <h3>No courses available yet.</h3>
                    <p>Check back soon for new learning paths.</p>
                </div>
            )
        }

        const courseCount = visibleCourses.length
        const hasSearchQuery = Boolean(searchQuery.trim())
        const hasCategoryFilter = selectedCategory !== "all"
        const hasActiveFilter = hasSearchQuery || hasCategoryFilter

        const courseCountLabel = `${
            courseCount === 1 ? "course" : "courses"
        } ${hasActiveFilter ? "found" : "available"}`

        const currencyLabel = countryCode === "US" ? "USD" : "INR"

        return (
            <>
                <div className="spc-summary" role="status">
                    <div className="spc-summary-main">
                        <strong>{courseCount}</strong>
                        <span>{courseCountLabel}</span>
                        <span
                            className="spc-summary-divider"
                            aria-hidden="true"
                        />
                        <span>
                            Prices in{" "}
                            <span className="spc-summary-currency">
                                {currencyLabel}
                            </span>
                        </span>
                    </div>
                </div>

                {showCountryFallbackNotice && (
                    <div className="spc-notice" role="status">
                        <span>
                            We couldn&apos;t confirm your country, so prices are
                            shown in INR.
                        </span>
                        <button type="button" onClick={switchToUsd}>
                            Switch to USD
                        </button>
                    </div>
                )}

                <div
                    className="spc-category-controls"
                    aria-label="Filter courses by category"
                >
                    <button
                        type="button"
                        className={`spc-category-button ${
                            selectedCategory === "all" ? "is-active" : ""
                        }`}
                        aria-pressed={selectedCategory === "all"}
                        onClick={() => setSelectedCategory("all")}
                    >
                        All
                    </button>

                    {courseCategories.map((category) => {
                        const isActive = selectedCategory === category

                        return (
                            <button
                                key={category}
                                type="button"
                                className={`spc-category-button ${
                                    isActive ? "is-active" : ""
                                }`}
                                aria-pressed={isActive}
                                onClick={() => setSelectedCategory(category)}
                            >
                                {category}
                            </button>
                        )
                    })}
                </div>

                <div className="spc-course-controls">
                    <label className="spc-control-label">
                        <span>Search courses</span>
                        <input
                            className="spc-search-input"
                            type="search"
                            value={searchQuery}
                            onChange={(event) =>
                                setSearchQuery(event.target.value)
                            }
                            placeholder="Search by course, topic, or category"
                            aria-label="Search courses"
                        />
                    </label>

                    <label className="spc-control-label">
                        <span>Sort by price</span>
                        <select
                            className="spc-sort-select"
                            value={sortOption}
                            onChange={(event) =>
                                setSortOption(
                                    event.target.value as CourseSortOption
                                )
                            }
                            aria-label="Sort courses by price"
                        >
                            <option value="default">Default order</option>
                            <option value="price-low-to-high">
                                Price: low to high
                            </option>
                            <option value="price-high-to-low">
                                Price: high to low
                            </option>
                        </select>
                    </label>
                </div>

                {courseCount === 0 ? (
                    <div className="spc-state">
                        <div className="spc-state-icon">?</div>
                        <h3>No courses match your filters.</h3>
                        <p>Try another category or search term.</p>
                        <button
                            type="button"
                            onClick={() => {
                                setSearchQuery("")
                                setSelectedCategory("all")
                            }}
                        >
                            Clear filters
                        </button>
                    </div>
                ) : (
                    <div className="spc-grid">
                        {visibleCourses.map((course, courseIndex) => (
                            <CourseCard
                                key={
                                    course.courseCode ||
                                    `${course.courseName}-${courseIndex}`
                                }
                                course={course}
                                countryCode={countryCode}
                            />
                        ))}
                    </div>
                )}
            </>
        )
    }

    const sectionStyle = {
        "--spc-accent": accentColor,
        "--spc-radius": `${cardRadius}px`,
        "--spc-card-gap": `${cardGap}px`,
        "--spc-section-padding": `${sectionPadding}px`,
        "--spc-card-padding": `${cardPadding}px`,
    } as React.CSSProperties

    return (
        <section
            className="spc-section"
            style={sectionStyle}
            aria-label="Available courses"
        >
            <style>{allCourseStyles}</style>
            <div className="spc-section-inner">{renderContent()}</div>
        </section>
    )
}

addPropertyControls(CoursesSection, {
    accentColor: {
        type: ControlType.Color,
        title: "Accent",
        defaultValue: DEFAULT_ACCENT_COLOR,
    },
    cardRadius: {
        type: ControlType.Number,
        title: "Card radius",
        defaultValue: DEFAULT_CARD_RADIUS,
        min: 0,
        max: 24,
        step: 1,
        unit: "px",
    },
    cardGap: {
        type: ControlType.Number,
        title: "Card gap",
        defaultValue: DEFAULT_CARD_GAP,
        min: 8,
        max: 32,
        step: 4,
        unit: "px",
    },
    sectionPadding: {
        type: ControlType.Number,
        title: "Padding",
        defaultValue: DEFAULT_SECTION_PADDING,
        min: 0,
        max: 80,
        step: 4,
        unit: "px",
    },
    cardPadding: {
        type: ControlType.Number,
        title: "Card padding",
        defaultValue: DEFAULT_CARD_PADDING,
        min: 8,
        max: 40,
        step: 1,
        unit: "px",
    },
})
