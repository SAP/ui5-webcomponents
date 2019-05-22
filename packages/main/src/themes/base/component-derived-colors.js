
const derivationsFactory = ({ darken, lighten, contrast, fade, saturate, desaturate, mix, spin, concat }) => {
	const derivations = {
		"--sapUiFieldWarningColorDarken100": () => darken("--sapUiFieldWarningColor", 100), // #000000;
		"--sapUiListBackgroundDarken3": () => darken("--sapUiListBackground", 3), // #f7f7f7;
		"--sapUiListBackgroundDarken10": () => darken("--sapUiListBackground", 10), // #e6e6e6;
		"--sapUiListBackgroundDarken13": () => darken("--sapUiListBackground", 13), // #dedede;
		"--sapUiListBackgroundDarken15": () => darken("--sapUiListBackground", 15), // #d9d9d9;
		"--sapUiListBackgroundDarken20": () => darken("--sapUiListBackground", 20), // #cccccc;
		"--sapUiTileBackgroundDarken20": () => darken("--sapUiTileBackground", 20), // #000000;
		"--sapUiListBorderColorLighten10": () => lighten("--sapUiListBorderColor", 10), // #ffffff;
		"--sapUiActiveLighten3": () => lighten("--sapUiActive", 3), // #085caf;
		"--sapUiLinkDarken15": () => darken("--sapUiLink", 15), // #004065;
		"--sapUiSelectedDarken10": () => darken("--sapUiSelected", 10), // #346187;
		"--sapUiShellBorderColorLighten30": () => lighten("--sapUiShellBorderColor", 30), // rgba(77, 77, 77, 0);
		"--sapUiToggleButtonPressedBackgroundLighten50Desaturate47": () => lighten(desaturate("--sapUiToggleButtonPressedBackground", 47), 50), // #dddddd;
		"--sapUiToggleButtonPressedBorderColorLighten19Desaturate46": () => lighten(desaturate("--sapUiToggleButtonPressedBorderColor", 46), 19), // #818181;
		"--sapUiSuccessBGLighten5": () => lighten("--sapUiSuccessBG", 5), // #f6fcf6;
		"--sapUiErrorBGLighten4": () => lighten("--sapUiErrorBG", 4), // #fff8f8;
		"--sapUiButtonBackgroundDarken7": () => darken("--sapUiButtonBackground", 7), // #e5e5e5;
		"--sapUiButtonBackgroundDarken2": () => darken("--sapUiButtonBackground", 2), // #f2f2f2;
		"--sapUiButtonHoverBackgroundDarken2": () => darken("--sapUiButtonHoverBackground", 2), // #e5e5e5;
		"--sapUiButtonHoverBackgroundDarken5": () => darken("--sapUiButtonHoverBackground", 5),
		"--sapUiButtonRejectActiveBackgroundDarken5": () => darken("--sapUiButtonRejectActiveBackground", 5), // #a20000;
		"--sapUiButtonAcceptActiveBackgroundDarken5": () => darken("--sapUiButtonAcceptActiveBackground", 5), // #246924;
		"--sapUiContentForegroundColorLighten5": () => lighten("--sapUiContentForegroundColor", 5), // #f2f2f2;
		"--sapUiContentForegroundColorLighten7": () => lighten("--sapUiContentForegroundColor", 7), // #f7f7f7;
		"--sapUiContentForegroundColorDarken3": () => darken("--sapUiContentForegroundColor", 3), // #dedede;
		"--sapUiContentForegroundColorDarken5": () => darken("--sapUiContentForegroundColor", 5), // #d9d9d9;
		"--sapUiContentForegroundColorDarken10": () => darken("--sapUiContentForegroundColor", 10), // #cccccc;
		"--sapUiButtonRejectActiveBackgroundLighten5": () => lighten("--sapUiButtonRejectActiveBackground", 5),
		"--sapUiButtonAcceptActiveBackgroundLighten5": () => lighten("--sapUiButtonAcceptActiveBackground", 5),
		"--sapUiButtonBackgroundDarken10": () => darken("--sapUiButtonBackground", 10),
	};

	return derivations;
};

module.exports = derivationsFactory;
