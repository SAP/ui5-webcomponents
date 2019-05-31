const derivationsFactory = ({ darken, lighten, contrast, fade, saturate, desaturate, mix, spin, concat }) => {
	const derivations = {
		"--sapHighlightTextColor": () => contrast("--sapHighlightColor", "--sapTextColor", "--sapContent_ContrastTextColor", "--sapContent_ContrastTextThreshold"),
		"--sapTile_TitleTextColor": () => contrast("--sapTile_Background", "--sapTile_TextColor", "--sapContent_ContrastTextColor", "--sapContent_ContrastTextThreshold"),
		"--sapTile_TextColor": () => contrast("--sapTile_Background", "--sapTextColor", "--sapContent_ContrastTextColor", "--sapContent_ContrastTextThreshold"),
		"--sapTile_IconColor": () => contrast("--sapTile_Background", "--sapContent_IconColor", "--sapContent_ContrastIconColor", "--sapContent_ContrastTextThreshold"),
		"--sapPageHeader_TextColor": () => contrast("--sapPageHeader_Background", "--sapTextColor", "--sapContent_ContrastTextColor", "--sapContent_ContrastTextThreshold"),
		"--sapPageFooter_TextColor": () => contrast("--sapPageFooter_Background", "--sapTextColor", "--sapContent_ContrastTextColor", "--sapContent_ContrastTextThreshold"),
		"--sapList_HeaderTextColor": () => contrast("--sapList_HeaderBackground", "--sapTitleColor", "--sapContent_ContrastTextColor", "--sapContent_ContrastTextThreshold"),
		"--sapGroup_TitleTextColor": () => contrast("--sapBackgroundColor", "--sapTitleColor", "--sapContent_ContrastTextColor", "--sapContent_ContrastTextThreshold"),
		"--sapButton_Hover_TextColor": () => contrast("--sapButton_Hover_Background", "--sapButton_TextColor", "--sapContent_ContrastTextColor", "--sapContent_ContrastTextThreshold"),
		"--sapButton_TextColor": () => contrast("--sapButton_Background", "--sapTextColor", "--sapContent_ContrastTextColor", "--sapContent_ContrastTextThreshold"),
		"--sapButton_Emphasized_TextColor": () => contrast("--sapButton_Emphasized_Background", "--sapButton_TextColor", "--sapContent_ContrastTextColor", "--sapContent_ContrastTextThreshold"),
		"--sapContent_ForegroundTextColor": () => contrast("--sapContent_ForegroundColor", "--sapTextColor", "--sapContent_ContrastTextColor", "--sapContent_ContrastTextThreshold"),

		"--sapUiContentContrastShadowColorFade50": () => fade("--sapUiContentContrastShadowColor", 50),
		"--sapUiContentContrastShadowColorFade60": () => fade("--sapUiContentContrastShadowColor", 60),
		"--sapUiContentContrastShadowColorFade80": () => fade("--sapUiContentContrastShadowColor", 80),

		"--sapUiShadowLevel1": () => concat({
			static: "0 0 1rem 0",
			var: "--sapUiContentContrastShadowColorFade50"
		}, {
			static: "0 0 0 2px",
			var: "--sapUiContentShadowColor"
		}),
		"--sapUiShadowLevel2": () => concat({
			static: "0 0.25rem 2rem 0",
			var: "--sapUiContentContrastShadowColorFade60"
		}, {
			static: "0 0 0 2px",
			var: "--sapUiContentShadowColor"
		}),
		"--sapUiShadowLevel3": () => concat({
			static: "0 0.625rem 4rem 0",
			var: "--sapUiContentContrastShadowColorFade80"
		}, {
			static: "0 0 0 2px",
			var: "--sapUiContentShadowColor"
		}),

		"--sapUiListTableGroupHeaderBorderColor": () => lighten("--sapUiListBorderColor", 40),
		"--sapUiListTableGroupHeaderTextColor": () => contrast("--sapUiListTableGroupHeaderBackground", "--sapUiListTextColor", "--sapUiContentContrastTextColor", "--sapUiContentContrastTextThreshold"),
		"--sapUiListTableFooterBorder": () => lighten("--sapUiListBorderColor", 40),
		"--sapUiListTableFixedBorder": () => lighten("--sapUiListBorderColor", 40),
		"--sapUiListVerticalBorderColor": () => lighten("--sapUiListBorderColor", 40),
		"--sapUiListActiveTextColor": () => contrast("--sapUiListActiveBackground", "--sapUiListTextColor", "--sapUiContentContrastTextColor", "--sapUiContentContrastTextThreshold"),
		"--sapUiSegmentedButtonIconColor": () => contrast("--sapUiSegmentedButtonBackground", "--sapUiContentIconColor", "--sapUiContentContrastIconColor", "--sapUiContentContrastTextThreshold"),
		"--sapUiSegmentedButtonActiveIconColor": () => contrast("--sapUiSegmentedButtonActiveBackground", "--sapUiContentIconColor", "--sapUiContentContrastIconColor", "--sapUiContentContrastTextThreshold"),
		"--sapUiSegmentedButtonSelectedIconColor": () => contrast("--sapUiSegmentedButtonSelectedBackground", "--sapUiContentIconColor", "--sapUiContentContrastIconColor", "--sapUiContentContrastTextThreshold"),
		"--sapUiSegmentedButtonTextColor": () => contrast("--sapUiSegmentedButtonBackground", "--sapUiButtonTextColor", "--sapUiContentContrastTextColor", "--sapUiContentContrastTextThreshold"),
		"--sapUiSegmentedButtonActiveTextColor": () => contrast("--sapUiSegmentedButtonActiveBackground", "--sapUiSegmentedButtonTextColor", "--sapUiContentContrastTextColor", "--sapUiContentContrastTextThreshold"),
		"--sapUiToggleButtonPressedTextColor": () => contrast("--sapUiToggleButtonPressedBackground", "--sapUiButtonTextColor", "--sapUiContentContrastTextColor", "--sapUiContentContrastTextThreshold"),
		"--sapUiButtonFooterTextColor": () => contrast("--sapUiPageFooterBackground", "--sapUiButtonTextColor", "--sapUiContentContrastTextColor", "--sapUiContentContrastTextThreshold"),
		"--sapUiButtonLiteTextColor": () => contrast("--sapUiButtonLiteBackground", "--sapUiButtonTextColor", "--sapUiContentContrastTextColor", "--sapUiContentContrastTextThreshold"),
		"--sapUiButtonRejectTextColor": () => contrast("--sapUiButtonRejectBackground", "--sapUiButtonTextColor", "--sapUiContentContrastTextColor", "--sapUiContentContrastTextThreshold"),
		"--sapUiButtonAcceptTextColor": () => contrast("--sapUiButtonAcceptBackground", "--sapUiButtonTextColor", "--sapUiContentContrastTextColor", "--sapUiContentContrastTextThreshold"),
		"--sapUiButtonActiveTextColor": () => contrast("--sapUiButtonActiveBackground", "--sapUiButtonTextColor", "--sapUiContentContrastTextColor", "--sapUiContentContrastTextThreshold"),
		"--sapUiButtonIconColor": () => contrast("--sapUiButtonBackground", "--sapUiContentIconColor", "--sapUiContentContrastIconColor", "--sapUiContentContrastTextThreshold"),
	};

	return derivations;
}

module.exports = derivationsFactory;
