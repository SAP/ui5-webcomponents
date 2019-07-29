const derivationsFactory = ({ darken, lighten, contrast, fade, saturate, desaturate, mix, spin, concat }) => {
	const derivations = {
		"--sapHighlightColor": () => darken("--sapBrandColor", 10),
		"--sapBackgroundColorDefault": () => darken("--sapPrimary3", 2),
		"--sapBackgroundColor": () => darken("--sapPrimary3", 2),

		"--sapErrorBackground": () => lighten("--sapNegativeColor", 59.5),
		"--sapWarningBackground": () => lighten("--sapCriticalColor", 49),
		"--sapSuccessBackground": () => lighten("--sapPositiveColor", 69),
		"--sapInformationBackground": () => lighten("--sapInformativeColor", 55),
		"--sapNeutralBackground": () => lighten("--sapNeutralColor", 53),
		"--sapInformativeTextColor": () => darken("--sapInformativeColor", 20),
		"--sapHighlightTextColor": () => contrast("--sapHighlightColor", "--sapTextColor", "--sapContent_ContrastTextColor", "--sapContent_ContrastTextThreshold"),
		"--sapContent_MarkerIconColor": () => darken("--sapAccentColor6", 13),
		"--sapContent_MarkerTextColor": () => darken("--sapAccentColor7", 8),
		"--sapContent_ImagePlaceholderBackground": () => darken("--sapBaseColor", 20),
		"--sapContent_DisabledTextColor": () => fade("--sapTextColor", (100 - ("--sapContent_DisabledOpacity" * 100))),
		"--sapContent_ForegroundColor": () => darken("--sapBaseColor", 6),
		"--sapContent_ForegroundTextColor": () => contrast("--sapContent_ForegroundColor", "--sapTextColor", "--sapContent_ContrastTextColor", "--sapContent_ContrastTextThreshold"),
		"--sapContent_BadgeBackground": () => darken("--sapAccentColor2", 12),
		"--sapShell_TextColor": () => contrast("--sapShellColor", "--sapTextColor", "--sapContent_ContrastTextColor", "--sapContent_ContrastTextThreshold"),

		"--sapButton_Hover_Background": () => lighten("--sapHighlightColor", 63),
		"--sapButton_BorderColor": () => darken("--sapBrandColor", 10),
		"--sapButton_TextColor": () => contrast("--sapButton_Background", darken("--sapBrandColor", 10), "--sapContent_ContrastTextColor", "--sapContent_ContrastTextThreshold"),
		"--sapButton_Hover_TextColor": () => contrast("--sapButton_Hover_Background", darken("--sapBrandColor", 10), "--sapContent_ContrastTextColor", "--sapContent_ContrastTextThreshold"),
		"--sapButton_Emphasized_TextColor": () => contrast("--sapButton_Emphasized_Background", "--sapBrandColor", "--sapContent_ContrastTextColor", "--sapContent_ContrastTextThreshold"),
		"--sapField_ReadOnly_Background": () => fade(darken("--sapField_Background", 5), 50),
		"--sapField_RequiredColor": () => darken("--sapAccentColor3", 12),
		"--sapGroup_TitleBorderColor": () => darken("--sapBaseColor", 15),
		"--sapGroup_TitleTextColor": () => contrast("--sapBackgroundColor", "--sapTitleColor", "--sapContent_ContrastTextColor", "--sapContent_ContrastTextThreshold"),
		"--sapGroup_ContentBorderColor": () => darken("--sapGroup_ContentBackground", 7),

		"--sapList_HeaderTextColor": () => contrast("--sapList_HeaderBackground", "--sapTitleColor", "--sapContent_ContrastTextColor", "--sapContent_ContrastTextThreshold"),
		"--sapList_BorderColor": () => darken("--sapList_Background", 7),
		"--sapList_SelectionBackgroundColor": () => lighten(desaturate("--sapSelectedColor", 24), 61),
		"--sapList_Hover_Background": () => contrast("--sapList_Background", darken("--sapList_Background", 2), lighten("--sapList_Background", 2)),
		"--sapScrollBar_FaceColor": () => darken("--sapBaseColor", 30),
		"--sapScrollBar_TrackColor": () => lighten("--sapScrollBar_FaceColor", 30),
		"--sapScrollBar_Hover_FaceColor": () => darken("--sapScrollBar_FaceColor", 3),
		"--sapPageHeader_BorderColor": () => darken("--sapPageHeader_Background", 15),
		"--sapPageHeader_TextColor": () => contrast("--sapPageHeader_Background", "--sapTextColor", "--sapContent_ContrastTextColor", "--sapContent_ContrastTextThreshold"),
		"--sapPageFooter_TextColor": () => contrast("--sapPageFooter_Background", "--sapTextColor", "--sapContent_ContrastTextColor", "--sapContent_ContrastTextThreshold"),
		"--sapInfobar_Background": () => darken("--sapAccentColor7", 8),
		"--sapTile_TitleTextColor": () => contrast("--sapTile_Background", "--sapTitleColor", "--sapContent_ContrastTextColor", "--sapContent_ContrastTextThreshold"),
		"--sapTile_TextColor": () => contrast("--sapTile_Background", "--sapContent_LabelColor", "--sapContent_ContrastTextColor", "--sapContent_ContrastTextThreshold"),
		"--sapTile_IconColor": () => contrast("--sapTile_Background", "--sapContent_NonInteractiveIconColor", "--sapContent_ContrastIconColor", "--sapContent_ContrastTextThreshold"),
		"--sapToolbar_SeparatorColor": () => darken("--sapBaseColor", 15),
		"--sapList_HeaderBackground": () => darken("--sapList_Background", 3),

		"--sapUiShellHoverBackground": () => darken("--sapUiShellColor", 7),
		"--sapUiShellActiveBackground": () => darken("--sapUiShellColor", 10),
		"--sapUiShellActiveTextColor": () => contrast("--sapUiShellActiveBackground", "--sapUiBaseText", "--sapUiContentContrastTextColor", "--sapUiContentContrastTextThreshold"),
		"--sapUiShellHoverToggleBackground": () => darken("--sapUiShellColor", 10),
		"--sapUiLinkHover": () => darken("--sapUiLink", 10),
		"--sapUiLinkInverted": () => lighten(saturate("--sapUiLink", 9), 48),
		"--sapUiNotificationBarBG": () => fade("--sapUiPrimary7", 98),
		"--sapUiNotifierSeparator": () => darken("--sapUiPrimary7", 20),
		"--sapUiNotificationBarBorder": () => lighten("--sapUiPrimary7", 20),
		"--sapUiContentShadowColorFade30": () => fade("--sapUiContentShadowColor", 30),
		"--sapUiCalloutShadow": () => concat({
			static: "0px 6px 12px 0px",
			var: "--sapUiContentShadowColorFade30"
		}),
		"--sapUiButtonIconColor": () => contrast("--sapUiButtonBackground", "--sapUiContentIconColor", "--sapUiContentContrastIconColor", "--sapUiContentContrastTextThreshold"),
		"--sapUiButtonActiveTextColor": () => contrast("--sapUiButtonActiveBackground", "--sapUiButtonTextColor", "--sapUiContentContrastTextColor", "--sapUiContentContrastTextThreshold"),
		"--sapUiButtonEmphasizedHoverBackground": () => darken("--sapUiButtonEmphasizedBackground", 7),
		"--sapUiButtonEmphasizedActiveBackground": () => darken("--sapUiButtonEmphasizedBackground", 10),
		"--sapUiButtonAcceptActiveBackground": () => darken("--sapUiPositiveElement", 5),
		"--sapUiButtonRejectTextColor": () => contrast("--sapUiButtonRejectBackground", "--sapUiNegativeText", "--sapUiContentContrastTextColor", "--sapUiContentContrastTextThreshold"),
		"--sapUiButtonAcceptTextColor": () => contrast("--sapUiButtonAcceptBackground", "--sapUiPositiveText", "--sapUiContentContrastTextColor", "--sapUiContentContrastTextThreshold"),
		"--sapUiButtonRejectActiveBackground": () => darken("--sapUiNegativeElement", 5),
		"--sapUiButtonFooterTextColor": () => contrast("--sapUiPageFooterBackground", "--sapUiButtonTextColor", "--sapUiContentContrastTextColor", "--sapUiContentContrastTextThreshold"),
		"--sapUiSegmentedButtonIconColor": () => contrast("--sapUiSegmentedButtonBackground", "--sapUiContentIconColor", "--sapUiContentContrastIconColor", "--sapUiContentContrastTextThreshold"),
		"--sapUiSegmentedButtonActiveIconColor": () => contrast("--sapUiSegmentedButtonActiveBackground", "--sapUiContentIconColor", "--sapUiContentContrastIconColor", "--sapUiContentContrastTextThreshold"),
		"--sapUiSegmentedButtonSelectedIconColor": () => contrast("--sapUiSegmentedButtonSelectedBackground", "--sapUiContentIconColor", "--sapUiContentContrastIconColor", "--sapUiContentContrastTextThreshold"),
		"--sapUiToggleButtonPressedTextColor": () => contrast("--sapUiToggleButtonPressedBackground", "--sapUiButtonTextColor", "--sapUiContentContrastTextColor", "--sapUiContentContrastTextThreshold"),
		"--sapUiToggleButtonPressedHoverBackground": () => lighten("--sapUiToggleButtonPressedBackground", 3),
		"--sapUiListActiveTextColor": () => contrast("--sapUiListActiveBackground", "--sapUiListTextColor", "--sapUiContentContrastTextColor", "--sapUiContentContrastTextThreshold"),
		"--sapUiSegmentedButtonTextColor": () => contrast("--sapUiSegmentedButtonBackground", "--sapUiButtonTextColor", "--sapUiContentContrastTextColor", "--sapUiContentContrastTextThreshold"),
		"--sapUiSegmentedButtonActiveTextColor": () => contrast("--sapUiSegmentedButtonActiveBackground", "--sapUiSegmentedButtonTextColor", "--sapUiContentContrastTextColor", "--sapUiContentContrastTextThreshold"),
		"--sapUiFieldPlaceholderTextColor": () => lighten("--sapUiContentLabelColor", 4),
		"--sapUiListSelectionHoverBackground": () => contrast("--sapUiListSelectionBackgroundColor", darken("--sapUiListSelectionBackgroundColor", 3), lighten("--sapUiListSelectionBackgroundColor", 3)),
		"--sapUiListFooterBackground": () => darken("--sapUiListBackground", 2),
		"--sapUiListTableGroupHeaderBackground": () => darken("--sapUiListBackground", 3),
		"--sapUiListTableGroupHeaderBorderColor": () => darken("--sapUiListBorderColor", 8),
		"--sapUiListTableGroupHeaderTextColor": () => contrast("--sapUiListTableGroupHeaderBackground", "--sapUiListTextColor", "--sapUiContentContrastTextColor", "--sapUiContentContrastTextThreshold"),
		"--sapUiListTableFixedBorder": () => darken("--sapUiListBorderColor", 8),
		"--sapUiPageFooterBorderColor": () => contrast("--sapUiPageFooterBackground", darken("--sapUiPageFooterBackground", 15), lighten("--sapUiPageFooterBackground", 12), "--sapUiContentContrastTextThreshold"),
		"--sapUiInfobarHoverBackground": () => darken("--sapUiInfobarBackground", 3),
		"--sapUiObjectHeaderBorderColor": () => darken("--sapUiObjectHeaderBackground", 15),
		"--sapUiDragAndDropActiveBackground": () => fade("--sapUiLink", 5),
		"--sapUiContentShadowColorFade5": () => fade("--sapUiContentShadowColor", 5),
		"--sapUiButtonBackgroundDarken24": () => darken("--sapUiButtonBackground", 24),
		"--sapUiButtonHoverBorderColorLighten30": () => lighten("--sapUiButtonHoverBorderColor", 30),
		"--sapUiShadowHeader": () => concat({
			static: "0 1px 0.5rem 0",
			var: "--sapUiContentShadowColorFade5"
		}),
		"--sapUiContentShadowColorFade15": () => fade("--sapUiContentShadowColor", 15),
		"--sapUiShadowLevel0": () => concat({
			static: "0 0 0 1px",
			var: "--sapUiContentShadowColorFade15"
		}),
		"--sapUiShadowLevel1": () => concat({
			static: "0 0.125rem 0.5rem 0",
			var: "--sapUiContentShadowColorFade15"
		}, {
			static: "",
			var: "--sapUiShadowLevel0"
		}),
		"--sapUiShadowLevel2": () => concat({
			static: "0 0.625rem 1.875rem 0",
			var: "--sapUiContentShadowColorFade15"
		}, {
			static: "",
			var: "--sapUiShadowLevel0"
		}),
		"--sapUiShadowLevel3": () => concat({
			static: "0 1.25rem 5rem 0",
			var: "--sapUiContentShadowColorFade15"
		}, {
			static: "",
			var: "--sapUiShadowLevel0"
		}),
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
