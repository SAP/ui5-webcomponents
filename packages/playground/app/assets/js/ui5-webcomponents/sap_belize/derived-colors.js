const derivationsFactory = ({ darken, lighten, contrast, fade, saturate, desaturate, mix, spin, concat }) => {
	const derivations = {
		"--sapErrorBackground": () => lighten("--sapNegativeColor", 58),
		"--sapWarningBackground": () => lighten("--sapCriticalColor", 46),
		"--sapSuccessBackground": () => lighten("--sapPositiveColor", 60),
		"--sapInformationBackground": () => lighten("--sapInformativeColor", 48),
		"--sapNeutralBackground": () => lighten("--sapNeutralColor", 56),
		"--sapErrorColor": () => lighten("--sapNegativeColor", 10),
		"--sapWarningColor": () => lighten("--sapCriticalColor", 10),
		"--sapSuccessColor": () => lighten("--sapPositiveColor", 10),
		"--sapContent_ImagePlaceholderForegroundColor": () => lighten("--sapBaseColor", 5),
		"--sapContent_LabelColor": () => lighten("--sapTextColor", 20),
		"--sapContent_ForegroundColor": () => lighten("--sapPrimary6", 15),
		"--sapContent_ForegroundTextColor": () => contrast("--sapContent_ForegroundColor", "--sapTextColor", "--sapContent_ContrastTextColor", "--sapContent_ContrastTextThreshold"),
		"--sapContent_DisabledTextColor": () => fade("--sapTextColor", (100 - ("--sapContent_DisabledOpacity" * 100))),
		"--sapButton_Emphasized_Background": () => lighten(saturate("--sapHighlightColor", 10), 10),
		"--sapButton_Emphasized_BorderColor": () => darken("--sapButton_Emphasized_Background", 5),
		"--sapButton_Emphasized_TextColor": () => contrast("--sapButton_Emphasized_Background", darken("--sapPrimary1", 8), "--sapContent_ContrastTextColor", "--sapContent_ContrastTextThreshold"),
		"--sapButton_Hover_TextColor": () => contrast("--sapButton_Hover_Background", darken("--sapHighlightColor", 10), "--sapContent_ContrastTextColor", "--sapContent_ContrastTextThreshold"),
		"--sapButton_Background": () => darken("--sapPrimary4", 3),
		"--sapButton_BorderColor": () => darken("--sapButton_Background", 30),
		"--sapButton_TextColor": () => contrast("--sapButton_Background", darken("--sapHighlightColor", 10), "--sapContent_ContrastTextColor", "--sapContent_ContrastTextThreshold"),
		"--sapField_ReadOnly_BorderColor": () => lighten("--sapField_BorderColor", 5),
		"--sapGroup_TitleBorderColor": () => lighten("--sapPrimary6", 5),
		"--sapGroup_TitleTextColor": () => contrast("--sapBackgroundColor", "--sapTitleColor", "--sapContent_ContrastTextColor", "--sapContent_ContrastTextThreshold"),
		"--sapGroup_ContentBackground": () => lighten("--sapBackgroundColor", 2),
		"--sapGroup_ContentBorderColor": () => darken("--sapGroup_ContentBackground", 8),

		"--sapShell_TextColor": () => darken("--sapBrandColor", 10),
		"--sapShell_Background": () => darken(desaturate("--sapBaseColor", 6), 11),
		"--sapShell_BackgroundPatternColor": () => fade("--sapPrimary4", 8),
		"--sapList_SelectionBackgroundColor": () => lighten(desaturate("--sapSelectedColor", 2), 47),
		"--sapList_Hover_Background": () => contrast("--sapList_Background", darken("--sapList_Background", 6), lighten("--sapList_Background", 6)),
		"--sapScrollBar_FaceColor": () => darken("--sapPrimary6", 5),
		"--sapScrollBar_TrackColor": () => lighten("--sapScrollBar_FaceColor", 30),
		"--sapScrollBar_Hover_FaceColor": () => darken("--sapScrollBar_FaceColor", 3),
		"--sapPageHeader_BorderColor": () => darken("--sapPageHeader_Background", 8),
		"--sapPageHeader_TextColor": () => contrast("--sapPageHeader_Background", lighten("--sapTextColor", 20), "--sapContent_ContrastTextColor", "--sapContent_ContrastTextThreshold"),
		"--sapTile_TitleTextColor": () => contrast("--sapTile_Background", "--sapTextColor", "--sapContent_ContrastTextColor", "--sapContent_ContrastTextThreshold"),
		"--sapTile_TextColor": () => contrast("--sapTile_Background", lighten("--sapTile_TitleTextColor", 20), "--sapContent_ContrastTextColor", "--sapContent_ContrastTextThreshold"),
		"--sapTile_IconColor": () => contrast("--sapTile_Background", lighten("--sapContent_IconColor", 34), "--sapContent_ContrastIconColor", "--sapContent_ContrastTextThreshold"),
		"--sapContent_NonInteractiveIconColor": () => darken("--sapPrimary6", 22),
		"--sapContent_IconColor": () => darken("--sapHighlightColor", 10),
		"--sapContent_MarkerTextColor": () => darken("--sapAccentColor7", 8),
		"--sapContent_ImagePlaceholderBackground": () => darken("--sapBaseColor", 9),
		"--sapButton_Hover_Background": () => darken("--sapButton_Background", 5),
		"--sapField_ReadOnly_Background": () => fade(darken("--sapField_Background", 5), 50),
		"--sapList_BorderColor": () => darken("--sapList_Background", 10.15),
		"--sapList_HeaderBackground": () => darken("--sapPrimary4", 3),
		"--sapList_HeaderTextColor": () => contrast("--sapList_HeaderBackground", "--sapTitleColor", "--sapContent_ContrastTextColor", "--sapContent_ContrastTextThreshold"),

		"--sapPageFooter_TextColor": () => contrast("--sapPageFooter_Background", "--sapTextColor", "--sapContent_ContrastTextColor", "--sapContent_ContrastTextThreshold"),
		"--sapInfobar_Background": () => darken("--sapAccentColor7", 5),
		"--sapToolbar_SeparatorColor": () => fade("--sapPrimary1", 20),
		"--sapHighlightTextColor": () => contrast("--sapHighlightColor", "--sapTextColor", "--sapContent_ContrastTextColor", "--sapContent_ContrastTextThreshold"),

		"--sapUiShellHoverBackground": () => darken("--sapUiBrand", 10),
		"--sapUiShellActiveBackground": () => darken("--sapUiBrand", 17),
		"--sapUiShellActiveTextColor": () => lighten("--sapUiBrand", 55),
		"--sapUiShellHoverToggleBackground": () => darken("--sapUiBrand", 32),
		"--sapUiShellContainerBackground": () => lighten("--sapUiShellBackground", 16),
		"--sapUiShellAltContainerBackground": () => darken(saturate("--sapUiShellBackground", 6), 28),
		"--sapUiShellGroupTextColor": () => darken(desaturate("--sapUiShellTextColor", 100), 16.5),
		"--sapUiLinkInverted": () => lighten("--sapUiLink", 40),
		"--sapUiNotificationBarBG": () => fade("--sapUiPrimary7", 98),
		"--sapUiNotifierSeparator": () => darken("--sapUiPrimary7", 20),
		"--sapUiNotificationBarBorder": () => lighten("--sapUiPrimary7", 20),
		"--sapUiButtonIconColor": () => contrast("--sapUiButtonBackground", "--sapUiContentIconColor", "--sapUiContentContrastIconColor", "--sapUiContentContrastTextThreshold"),
		"--sapUiButtonActiveTextColor": () => contrast("--sapUiButtonActiveBackground", "--sapUiButtonTextColor", "--sapUiContentContrastTextColor", "--sapUiContentContrastTextThreshold"),
		"--sapUiButtonEmphasizedHoverBackground": () => darken("--sapUiButtonEmphasizedBackground", 5),
		"--sapUiButtonEmphasizedHoverBorderColor": () => darken("--sapUiButtonEmphasizedBackground", 5),
		"--sapUiButtonEmphasizedTextShadow": () => contrast("--sapUiButtonEmphasizedTextColor", "--sapUiContentShadowColor", "--sapUiContentContrastShadowColor", "--sapUiContentContrastTextThreshold"),
		"--sapUiButtonAcceptTextColor": () => contrast("--sapUiButtonAcceptBackground", "--sapUiPositiveText", "--sapUiContentContrastTextColor", "--sapUiContentContrastTextThreshold"),
		"--sapUiButtonRejectTextColor": () => contrast("--sapUiButtonRejectBackground", "--sapUiNegativeText", "--sapUiContentContrastTextColor", "--sapUiContentContrastTextThreshold"),
		"--sapUiButtonLiteHoverBackground": () => fade(darken("--sapUiButtonHoverBackground", 22), 50),
		"--sapUiButtonFooterTextColor": () => contrast("--sapUiPageFooterBackground", "--sapUiButtonTextColor", "--sapUiContentContrastTextColor", "--sapUiContentContrastTextThreshold"),
		"--sapUiToggleButtonPressedBackground": () => darken("--sapUiSelected", 10),
		"--sapUiToggleButtonPressedBorderColor": () => darken("--sapUiToggleButtonPressedBackground", 5),
		"--sapUiSegmentedButtonBackground": () => lighten("--sapUiButtonBackground", 3),
		"--sapUiSegmentedButtonBorderColor": () => lighten("--sapUiButtonBorderColor", 8),
		"--sapUiToggleButtonPressedHoverBackground": () => lighten("--sapUiToggleButtonPressedBackground", 10),
		"--sapUiToggleButtonPressedTextColor": () => contrast("--sapUiToggleButtonPressedBackground", "--sapUiButtonTextColor", "--sapUiContentContrastTextColor", "--sapUiContentContrastTextThreshold"),
		"--sapUiSegmentedButtonTextColor": () => contrast("--sapUiSegmentedButtonBackground", "--sapUiButtonTextColor", "--sapUiContentContrastTextColor", "--sapUiContentContrastTextThreshold"),
		"--sapUiSegmentedButtonIconColor": () => contrast("--sapUiSegmentedButtonBackground", "--sapUiContentIconColor", "--sapUiContentContrastIconColor", "--sapUiContentContrastTextThreshold"),
		"--sapUiSegmentedButtonActiveIconColor": () => contrast("--sapUiSegmentedButtonActiveBackground", "--sapUiContentIconColor", "--sapUiContentContrastIconColor", "--sapUiContentContrastTextThreshold"),
		"--sapUiSegmentedButtonSelectedIconColor": () => contrast("--sapUiSegmentedButtonSelectedBackground", "--sapUiContentIconColor", "--sapUiContentContrastIconColor", "--sapUiContentContrastTextThreshold"),
		"--sapUiSegmentedButtonFooterBorderColor": () => lighten("--sapUiButtonBorderColor", 8),
		"--sapButton_Background": () => darken("--sapPrimary4", 3),
		"--sapButton_BorderColor": () => darken("--sapButton_Background", 30),
		"--sapUiFieldPlaceholderTextColor": () => lighten("--sapUiFieldTextColor", 46),
		"--sapUiListActiveTextColor": () => contrast("--sapUiListActiveBackground", "--sapUiListTextColor", "--sapUiContentContrastTextColor", "--sapUiContentContrastTextThreshold"),
		"--sapUiListSelectionHoverBackground": () => contrast("--sapUiListSelectionBackgroundColor", darken("--sapUiListSelectionBackgroundColor", 3), lighten("--sapUiListSelectionBackgroundColor", 3)),
		"--sapUiListFooterBackground": () => darken("--sapUiBaseColor", 9),
		"--sapUiListVerticalBorderColor": () => darken("--sapUiListBorderColor", 3),
		"--sapUiListTableGroupHeaderBackground": () => darken("--sapUiListBackground", 5),
		"--sapUiListTableGroupHeaderBorderColor": () => darken("--sapUiListBorderColor", 10),
		"--sapUiListTableGroupHeaderTextColor": () => contrast("--sapUiListTableGroupHeaderBackground", "--sapUiContentMarkerTextColor", "--sapUiContentContrastTextColor", "--sapUiContentContrastTextThreshold"),
		"--sapUiListTableFooterBorder": () => darken("--sapUiListBorderColor", 10),
		"--sapUiListTableFixedBorder": () => darken("--sapUiListBorderColor", 30),
		"--sapUiPageFooterBorderColor": () => contrast("--sapUiPageFooterBackground", darken("--sapUiPageFooterBackground", 8), lighten("--sapUiPageFooterBackground", 12)),
		"--sapUiInfobarHoverBackground": () => darken("--sapUiInfobarBackground", 3),
		"--sapUiObjectHeaderBorderColor": () => darken("--sapUiObjectHeaderBackground", 8),
		"--sapUiDragAndDropActiveBackground": () => fade("--sapUiLink", 5),
		"--sapUiSegmentedButtonActiveTextColor": () => contrast("--sapUiSegmentedButtonActiveBackground", "--sapUiSegmentedButtonTextColor", "--sapUiContentContrastTextColor", "--sapUiContentContrastTextThreshold"),
		"--sapUiContentShadowColorFade15": () => fade("--sapUiContentShadowColor", 15),
		"--sapUiShadowText": () => concat({static: "0 0 0.125rem", var: "--sapUiContentContrastShadowColor"}),
		"--sapUiShadowHeader": () => concat({static: "0 0.125rem 0 0", var: "--sapUiObjectHeaderBackground"}, {static: "inset 0 -0.125rem 0 0", var: "--sapUiObjectHeaderBorderColor"}),
		"--sapUiShadowLevel0": () => concat({static: "0 0 0 1px", var: "--sapUiContentShadowColorFade15"}),
		"--sapUiShadowLevel1": () => concat({static: "0 0.125rem 0.5rem 0", var: "--sapUiContentShadowColorFade15"}, {static: "", var: "--sapUiShadowLevel0"}),
		"--sapUiShadowLevel2": () => concat({static: "0 0.625rem 1.875rem 0", var: "--sapUiContentShadowColorFade15"},{static: "", var: "--sapUiShadowLevel0"}),
		"--sapUiShadowLevel3": () => concat({static: "0 1.25rem 5rem 0", var: "--sapUiContentShadowColorFade15"}, {static: "", var: "--sapUiShadowLevel0"}),
	};

	return derivations;
};

var globalDerivedColors = derivationsFactory;

const derivationsFactory$1 = ({ darken, lighten, contrast, fade, saturate, desaturate, mix, spin, concat }) => {
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
		"--sapBackgroundColorFade72": () => fade("--sapBackgroundColor", 72),
		"--sapUiAccent1Lighten50": () => lighten("--sapUiAccent1", 50),
		"--sapUiAccent2Lighten40": () => lighten("--sapUiAccent2", 40),
		"--sapUiAccent3Lighten46": () => lighten("--sapUiAccent3", 46),
		"--sapUiAccent4Lighten46": () => lighten("--sapUiAccent4", 46),
		"--sapUiAccent5Lighten32": () => lighten("--sapUiAccent5", 32),
		"--sapUiAccent6Lighten52": () => lighten("--sapUiAccent6", 52),
		"--sapUiAccent7Lighten64": () => lighten("--sapUiAccent7", 64),
		"--sapUiAccent8Lighten61": () => lighten("--sapUiAccent8", 61),
		"--sapUiAccent9Lighten37": () => lighten("--sapUiAccent9", 37),
		"--sapUiAccent10Lighten49": () => lighten("--sapUiAccent10", 49),
	};

	return derivations;
};

var componentDerivedColors = derivationsFactory$1;

var derivedColors = [globalDerivedColors, componentDerivedColors];

export default derivedColors;
//# sourceMappingURL=derived-colors.js.map
