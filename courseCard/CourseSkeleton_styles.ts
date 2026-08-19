export const courseSkeletonStyles = `
.spc-skeleton-card {
    min-height: 350px;
    box-shadow: none;
}

.spc-skeleton {
    background: linear-gradient(
        100deg,
        #eceef3 20%,
        #f9faff 40%,
        #eceef3 60%
    );
    background-size: 200% 100%;
    animation: spc-shimmer 1.2s infinite linear;
}

.spc-skeleton-media {
    aspect-ratio: 16 / 9;
}

.spc-skeleton-body {
    display: flex;
    flex: 1;
    flex-direction: column;
    padding: 17px;
}

.spc-skeleton-line {
    height: 9px;
    margin-bottom: 10px;
    border-radius: 4px;
}

.spc-line-wide {
    width: 90%;
}

.spc-line-medium {
    width: 74%;
    margin-top: 15px;
}

.spc-line-short {
    width: 58%;
}

.spc-skeleton-price {
    width: 64px;
    height: 21px;
    margin-top: auto;
    border-radius: 4px;
}

@keyframes spc-shimmer {
    from {
        background-position: 200% 0;
    }

    to {
        background-position: -200% 0;
    }
}

@media (prefers-reduced-motion: reduce) {
    .spc-skeleton {
        animation: none;
    }
}
`
