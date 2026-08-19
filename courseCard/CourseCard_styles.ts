export const courseCardStyles = `
.spc-card {
    display: flex;
    min-width: 0;
    min-height: 350px;
    flex-direction: column;
    overflow: hidden;
    border: 1px solid #e4e6ed;
    border-radius: var(--spc-radius);
    background: #ffffff;
    box-shadow: 0 10px 26px rgba(28, 32, 52, 0.06);
    transition: transform 180ms ease, box-shadow 180ms ease,
        border-color 180ms ease;
}

.spc-card:hover {
    transform: translateY(-3px);
    border-color: var(--spc-accent);
    box-shadow: 0 16px 34px rgba(28, 32, 52, 0.11);
}

.spc-card-media {
    position: relative;
    aspect-ratio: 16 / 9;
    overflow: hidden;
    background-color: #dfe3ef;
    background-position: center;
    background-size: cover;
}

.spc-card-media-shade {
    position: absolute;
    inset: 0;
    background: linear-gradient(
        180deg,
        rgba(14, 18, 38, 0.06) 15%,
        rgba(14, 18, 38, 0.82) 100%
    );
}

.spc-card-media-top,
.spc-card-title {
    position: absolute;
    left: 17px;
    right: 17px;
}

.spc-card-media-top {
    top: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
}

.spc-category,
.spc-course-type-on-image {
    overflow: hidden;
    border-radius: 5px;
    padding: 6px 8px;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 10px;
    font-weight: 700;
    line-height: 1;
}

.spc-category {
    max-width: 65%;
    background: rgba(255, 255, 255, 0.9);
    color: var(--spc-accent);
}

.spc-course-type-on-image {
    max-width: 42%;
    background: rgba(14, 18, 38, 0.52);
    color: rgba(255, 255, 255, 0.9);
}

.spc-card-title {
    bottom: 16px;
    color: #fff;
}

.spc-card-title > span {
    display: block;
    margin-bottom: 7px;
    overflow: hidden;
    color: rgba(255, 255, 255, 0.78);
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-overflow: ellipsis;
    text-transform: uppercase;
    white-space: nowrap;
}

.spc-card-title h3 {
    display: -webkit-box;
    margin: 0;
    overflow: hidden;
    font-size: 23px;
    font-weight: 750;
    line-height: 1.08;
    letter-spacing: 0;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}

.spc-card-body {
    display: flex;
    flex: 1;
    flex-direction: column;
    padding: var(--spc-card-padding);
}

.spc-description {
    display: -webkit-box;
    min-height: 39px;
    margin: 0;
    overflow: hidden;
    color: #686c79;
    font-size: 12px;
    line-height: 1.62;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}

.spc-card-footer {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 12px;
    margin-top: auto;
    padding-top: 18px;
}

.spc-price-block {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.spc-price-block span {
    color: #9699a4;
    font-size: 10px;
    font-weight: 600;
}

.spc-price-block strong {
    color: #151720;
    font-size: 21px;
    font-weight: 750;
    line-height: 1;
}

.spc-refundable {
    border-radius: 5px;
    background: #eaf7f0;
    padding: 6px 8px;
    color: #21784f;
    font-size: 10px;
    font-weight: 700;
    line-height: 1;
    white-space: nowrap;
}

@media (max-width: 600px) {
    .spc-card {
        min-height: 338px;
    }
}

@media (prefers-reduced-motion: reduce) {
    .spc-card {
        transition: none;
    }
}
`
