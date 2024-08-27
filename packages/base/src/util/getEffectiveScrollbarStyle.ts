const NO_SCROLLBAR_STYLE_CLASS = "ui5-content-native-scrollbars";
const isSSR = typeof document === "undefined";

const getEffectiveScrollbarStyle = () => {
	return isSSR ? true : document.body.classList.contains(NO_SCROLLBAR_STYLE_CLASS);
};

export default getEffectiveScrollbarStyle;
