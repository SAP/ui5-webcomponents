const NO_SCROLLBAR_STYLE_CLASS = "ui5-content-native-scrollbars";
const isSSR = typeof document === "undefined";

const getEffectiveScrollbarStyle = () => {
	if (isSSR || document.body.classList.contains(NO_SCROLLBAR_STYLE_CLASS)) {
		return "";
	}

	return `
:host {
	scrollbar-color: var(--sapScrollBar_FaceColor) var(--sapScrollBar_TrackColor);
}`;
};

export default getEffectiveScrollbarStyle;
