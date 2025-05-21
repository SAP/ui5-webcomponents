// Animations
import animate, { duration } from "@ui5/webcomponents-base/dist/animations/animate.js";

const searchOpenAnimation = (element: HTMLElement) => {
    let computedStyles: CSSStyleDeclaration,
        paddingInlineStart: number,
        paddingInlineEnd: number,
        marginInlineStart: number,
        marginBottom: number,
        minwidth: number,
        opacity: number;
    let storedOverflow: string,
        storedpaddingInlineStart: string,
        storedpaddingInlineEnd: string,
        storedmarginInlineStart: string,
        storedMarginBottom: string,
        storedMinwidth: string,
        storedOpacity: string;

    const animation = animate({
        beforeStart: () => {
            // Show the element to measure its properties
            element.style.display = "flex";

            // Get Computed styles
            computedStyles = getComputedStyle(element);
            minwidth = parseFloat(computedStyles.minWidth);
            opacity = parseFloat(computedStyles.opacity);
            paddingInlineStart = parseFloat(computedStyles.paddingInlineStart);
            paddingInlineEnd = parseFloat(computedStyles.paddingBottom);
            marginInlineStart = parseFloat(computedStyles.marginInlineStart);
            marginBottom = parseFloat(computedStyles.marginBottom);

            // Store inline styles
            storedOverflow = element.style.overflow;
            storedMinwidth = element.style.minWidth;
            storedOpacity = element.style.opacity;
            storedpaddingInlineStart = element.style.paddingInlineStart;
            storedpaddingInlineEnd = element.style.paddingBottom;
            storedmarginInlineStart = element.style.marginInlineStart;
            storedMarginBottom = element.style.marginBottom;

            element.style.overflow = "hidden";
            element.style.minWidth = "0";
            element.style.opacity = "0";
            element.style.paddingInlineStart = "0";
            element.style.paddingBottom = "0";
            element.style.marginInlineStart = "0";
            element.style.marginBottom = "0";
        },
        duration,
        element,
        advance: progress => {
            // WORKAROUND
            element.style.display = "flex";
            // END OF WORKAROUND

            element.style.minWidth = `${(minwidth * progress)}px`;
            element.style.opacity = `${(opacity * progress)}`;
            element.style.paddingInlineStart = `${(paddingInlineStart * progress)}px`;
            element.style.paddingInlineEnd = `${(paddingInlineEnd * progress)}px`;
            element.style.marginInlineStart = `${(marginInlineStart * progress)}px`;
            element.style.marginBottom = `${(marginBottom * progress)}px`;
        },
    });

    animation.promise().then(() => {
        element.style.overflow = storedOverflow;
        element.style.minWidth = storedMinwidth;
        element.style.opacity = storedOpacity;
        element.style.paddingInlineStart = storedpaddingInlineStart;
        element.style.paddingBottom = storedpaddingInlineEnd;
        element.style.marginInlineStart = storedmarginInlineStart;
        element.style.marginBottom = storedMarginBottom;
    });

    return animation;
};

export default searchOpenAnimation;
