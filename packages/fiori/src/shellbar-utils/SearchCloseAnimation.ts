// Animations
import animate, { duration } from "@ui5/webcomponents-base/dist/animations/animate.js";

const searchCloseAnimation = (element: HTMLElement, searchMinWidth: number) => {
    let computedStyles: CSSStyleDeclaration,
        paddingStart: number,
        paddingEnd: number,
        marginStart: number,
        marginEnd: number,
        minwidth: number,
        opacity: number;
    let storedOverflow: string,
        storedpaddingStart: string,
        storedpaddingEnd: string,
        storedmarginStart: string,
        storedmarginEnd: string,
        storedminwidth: string,
        storedOpacity: string;
    const searchFieldwidth: number = searchMinWidth;

    const animation = animate({
        beforeStart: () => {
            const el = element;

            // Get Computed styles
            computedStyles = getComputedStyle(element);
            paddingStart = parseFloat(computedStyles.paddingInlineStart);
            paddingEnd = parseFloat(computedStyles.paddingInlineEnd);
            marginStart = parseFloat(computedStyles.marginInlineStart);
            marginEnd = parseFloat(computedStyles.marginInlineEnd);
            minwidth = searchFieldwidth;
            opacity = parseFloat(computedStyles.opacity);

            // Store inline styles
            storedOverflow = element.style.overflow;
            storedminwidth = element.style.minWidth;
            storedOpacity = element.style.opacity;
            storedpaddingStart = element.style.paddingInlineStart;
            storedpaddingEnd = element.style.paddingInlineEnd;
            storedmarginStart = element.style.marginInlineStart;
            storedmarginEnd = element.style.marginInlineEnd;

            el.style.overflow = "hidden";
        },
        duration,
        element,
        advance: progress => {
            element.style.minWidth = `${minwidth - (minwidth * progress)}px`;
            element.style.opacity = `${opacity - (opacity * progress)}`;
            element.style.paddingInlineStart = `${paddingStart - (paddingStart * progress)}px`;
            element.style.paddingInlineEnd = `${paddingEnd - (paddingEnd * progress)}px`;
            element.style.marginInlineStart = `${marginStart - (marginStart * progress)}px`;
            element.style.marginInlineEnd = `${marginEnd - (marginEnd * progress)}px`;
        },
    });

    animation.promise().then(reason => {
        if (!(reason instanceof Error)) {
            element.style.overflow = storedOverflow;
            element.style.minWidth = storedminwidth;
            element.style.opacity = storedOpacity;
            element.style.display = "none";
            element.style.paddingInlineStart = storedpaddingStart;
            element.style.paddingInlineEnd = storedpaddingEnd;
            element.style.marginInlineStart = storedmarginStart;
            element.style.marginInlineEnd = storedmarginEnd;
        }
    });

    return animation;
};

export default searchCloseAnimation;
