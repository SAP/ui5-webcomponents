const GLOBAL_SCROLLBAR_STYLE_CSS_VAR = "--_ui5_scrollbar_style";

const getEffectiveScrollbarStyle = el => getComputedStyle(el).getPropertyValue(GLOBAL_SCROLLBAR_STYLE_CSS_VAR);

export default getEffectiveScrollbarStyle;
