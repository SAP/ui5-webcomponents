const NO_SCROLLBAR_STYLE_CLASS = "ui5-content-native-scrollbars";
const isSSR = typeof document === "undefined";
const getEffectiveScrollbarStyle = () => {
    if (isSSR || document.body.classList.contains(NO_SCROLLBAR_STYLE_CLASS)) {
        return "";
    }
    return `::-webkit-scrollbar:horizontal {
	height: var(--sapScrollBar_Dimension);
}

::-webkit-scrollbar:vertical {
	width: var(--sapScrollBar_Dimension);
}

::-webkit-scrollbar {
	background-color: var(--sapScrollBar_TrackColor);
	border-left: none;
}

::-webkit-scrollbar-thumb {
	border-radius: var(--sapElement_BorderCornerRadius);
	background-color: var(--sapScrollBar_FaceColor);
}

::-webkit-scrollbar-thumb:hover {
	background-color: var(--sapScrollBar_Hover_FaceColor);
}

::-webkit-scrollbar-corner {
	background-color: var(--sapScrollBar_TrackColor);
}`;
};
export default getEffectiveScrollbarStyle;
//# sourceMappingURL=getEffectiveScrollbarStyle.js.map