export const courseStyles = `
.spc-section,
.spc-section * {
    box-sizing: border-box;
}

.spc-section {
    width: 100%;
    padding: var(--spc-section-padding);
    color: #14151d;
    background: #f7f8fb;
    font-family: Inter, Arial, sans-serif;
}

.spc-section-inner {
    width: min(1120px, 100%);
    margin: 0 auto;
}

.spc-summary {
    display: flex;
    align-items: center;
    min-height: 32px;
    margin-bottom: 18px;
    color: #6d7180;
    font-size: 12px;
    font-weight: 600;
}

.spc-summary-main {
    display: inline-flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 7px;
}

.spc-summary-main strong {
    color: #171923;
    font-size: 14px;
}

.spc-summary-divider {
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background: #b6b9c2;
}

.spc-summary-currency {
    color: var(--spc-accent);
}

.spc-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: var(--spc-card-gap);
}

.spc-category-controls {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 18px;
}

.spc-category-button {
    border: 1px solid #dfe2ea;
    border-radius: 999px;
    background: #fff;
    color: #343746;
    padding: 9px 14px;
    font: 700 12px Inter, Arial, sans-serif;
    cursor: pointer;
}

.spc-category-button:hover,
.spc-category-button.is-active {
    border-color: var(--spc-accent);
}

.spc-category-button.is-active {
    background: var(--spc-accent);
    color: #fff;
}

.spc-course-controls {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(190px, auto);
    gap: 12px;
    margin-bottom: 18px;
}

.spc-control-label {
    display: flex;
    min-width: 0;
    flex-direction: column;
    gap: 6px;
    color: #676b78;
    font-size: 11px;
    font-weight: 700;
}

.spc-search-input,
.spc-sort-select {
    width: 100%;
    min-height: 40px;
    border: 1px solid #dfe2ea;
    border-radius: 7px;
    outline: none;
    background: #fff;
    color: #171923;
    padding: 0 12px;
    font: 400 12px Inter, Arial, sans-serif;
}

.spc-search-input:focus,
.spc-sort-select:focus {
    border-color: var(--spc-accent);
    box-shadow: 0 0 0 3px rgba(76, 92, 255, 0.12);
}

.spc-search-input::placeholder {
    color: #a0a3ad;
}

.spc-sort-select {
    min-width: 190px;
    cursor: pointer;
}

.spc-notice {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 10px;
    margin: -2px 0 17px;
    border-left: 3px solid var(--spc-accent);
    border-radius: 5px;
    background: #eef0ff;
    padding: 10px 12px;
    color: #565d91;
    font-size: 15px;
    line-height: 1.45;
}

.spc-notice button {
    flex-shrink: 0;
    border: 1px solid var(--spc-accent);
    border-radius: 6px;
    background: #fff;
    color: var(--spc-accent);
    padding: 7px 12px;
    font: 700 12px Inter, Arial, sans-serif;
    cursor: pointer;
}

.spc-notice button:hover {
    background: var(--spc-accent);
    color: #fff;
}

.spc-state {
    display: grid;
    min-height: 280px;
    place-items: center;
    align-content: center;
    border: 1px dashed #d4d7e0;
    border-radius: var(--spc-radius);
    background: #fff;
    padding: 32px;
    text-align: center;
}

.spc-state-icon {
    display: grid;
    width: 38px;
    height: 38px;
    margin-bottom: 12px;
    place-items: center;
    border-radius: 50%;
    background: #eef0ff;
    color: var(--spc-accent);
    font-size: 17px;
    font-weight: 800;
}

.spc-state h3 {
    margin: 0 0 6px;
    color: #171923;
    font-size: 19px;
    line-height: 1.25;
}

.spc-state p {
    margin: 0;
    color: #737782;
    font-size: 13px;
    line-height: 1.5;
}

.spc-state button {
    margin-top: 18px;
    border: 0;
    border-radius: 6px;
    background: var(--spc-accent);
    color: #fff;
    padding: 10px 15px;
    font: 700 12px Inter, Arial, sans-serif;
    cursor: pointer;
}

/* Tablet: 1266px to 811px */
@media (max-width: 1266px) {
    .spc-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}

/* Mobile: 810px and below */
@media (max-width: 810px) {
    .spc-grid {
        grid-template-columns: minmax(0, 1fr);
    }

    .spc-notice {
        align-items: flex-start;
        flex-direction: column;
    }
}
`
