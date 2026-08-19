export default function CourseSkeleton() {
    return (
        <div className="spc-card spc-skeleton-card" aria-hidden="true">
            <div className="spc-skeleton spc-skeleton-media" />
            <div className="spc-skeleton-body">
                <div className="spc-skeleton spc-skeleton-line spc-line-wide" />
                <div className="spc-skeleton spc-skeleton-line spc-line-medium" />
                <div className="spc-skeleton spc-skeleton-line spc-line-short" />
                <div className="spc-skeleton spc-skeleton-price" />
            </div>
        </div>
    )
}
