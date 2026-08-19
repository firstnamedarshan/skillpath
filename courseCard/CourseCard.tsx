import type { Course, CountryCode } from "../courseTypes.ts"
import { formatPrice } from "../priceUtils.ts"

type CourseCardProps = {
    course?: Course
    countryCode?: CountryCode
}

const COURSE_IMAGE_URL =
    "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=85"

export default function CourseCard({
    course,
    countryCode = "IN",
}: CourseCardProps) {
    if (!course) {
        return null
    }

    return (
        <article className="spc-card">
            <div
                className="spc-card-media"
                role="img"
                aria-label={`${course.courseName} course image`}
                style={{ backgroundImage: `url("${COURSE_IMAGE_URL}")` }}
            >
                <div className="spc-card-media-shade" />

                <div className="spc-card-media-top">
                    <span className="spc-category">
                        {course.mainCategory || "Course"}
                    </span>
                    <span className="spc-course-type-on-image">
                        {course.courseType || "Course"}
                    </span>
                </div>

                <div className="spc-card-title">
                    <span>{course.shortCourse || "Learning path"}</span>
                    <h3>{course.courseName}</h3>
                </div>
            </div>

            <div className="spc-card-body">
                <p className="spc-description">
                    {course.description || "Course description unavailable."}
                </p>

                <div className="spc-card-footer">
                    <div className="spc-price-block">
                        <span>Course price</span>
                        <strong>{formatPrice(course, countryCode)}</strong>
                    </div>

                    {course.refundable ? (
                        <span className="spc-refundable">Refundable</span>
                    ) : null}
                </div>
            </div>
        </article>
    )
}
