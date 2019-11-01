const derivationsFactory = ({darken, lighten,contrast, fade, saturate, desaturate, mix, spin, concat}) => {
	const derivations = {
		"--sapBackgroundColorDefault": () => darken("--sapPrimary3", 6),
		"--sapBackgroundColor": () => darken("--sapPrimary3", 6),
		"--sapLink_Hover_Color": () => darken("--sapLinkColor", 10),
		"--sapLink_InvertedColor": () => lighten("--sapLinkColor", 14),
		"--sapErrorBackground": () => darken("--sapNegativeColor", 65),
		"--sapWarningBackground": () => darken("--sapCriticalColor", 60),
		"--sapSuccessBackground": () => darken("--sapPositiveColor", 62),
		"--sapInformationBackground": () => darken("--sapInformativeColor", 60),
		"--sapNeutralBackground": () => darken("--sapNeutralColor", 45),
		"--sapInformativeTextColor": () => lighten("--sapInformativeColor", 10),
		"--sapHighlightTextColor": () => contrast("--sapHighlightColor", "--sapTextColor", "--sapContent_ContrastTextColor", "--sapContent_ContrastTextThreshold"),
		"--sapContent_MarkerTextColor": () => lighten("--sapAccentColor7", 30),
		"--sapContent_ImagesapUiShellSelectedTextColorPlaceholderForegroundColor": () => lighten("--sapBaseColor", 20),
		"--sapContent_ImagePlaceholderForegroundColor": () => lighten("--sapBaseColor", 20),
		// used sapUiShadowLevel (0 to 3)
		"--sapContent_ShadowColorFade15": () => fade("--sapContent_ShadowColor", 15),
		"--sapContent_ShadowColorFade20": () => fade("--sapContent_ShadowColor", 20),
		"--sapContent_ShadowColorFade30": () => fade("--sapContent_ShadowColor", 30),
		"--sapContent_ShadowColorFade80": () => fade("--sapContent_ShadowColor", 80),
		"--sapObjectHeader_BorderColorFade8": () => fade("--sapObjectHeader_BorderColor", 8),

		"--sapContent_Shadow0": () => concat({
			"static": "0 0 0 1px",
			"var": "--sapContent_ShadowColorFade20",
		}, {
			"static": "0 0.125rem 0.5rem 0",
			"var": "--sapContent_ShadowColorFade30",
		}),

		"--sapContent_Shadow1": () => concat({
			"static": "0 0 0 1px",
			"var": "--sapContent_ShadowColorFade15",
		}, {
			"static": "0 0.125rem 0.5rem 0",
			"var": "--sapContent_ShadowColorFade30",
		}),

		"--sapContent_Shadow2": () => concat({
			"static": "0 0 0 1px",
			"var": "--sapContent_ShadowColorFade15",
		}, {
			"static": "0 0.625rem 1.875rem 0",
			"var": "--sapContent_ShadowColorFade30",
		}),

		"--sapContent_Shadow3": () => concat({
			"static": "0 0 0 1px",
			"var": "--sapContent_ShadowColorFade15",
		}, {
			"static": "0 1.25rem 5rem 0",
			"var": "--sapContent_ShadowColorFade30",
		}),

		"--sapContent_HeaderShadow": () => concat({
			"static": "0 0 0.25rem 0",
			"var": "--sapContent_ShadowColorFade80",
		}, {
			"static": "inset 0 -0.0625rem 0 0",
			"var": "--sapObjectHeader_BorderColorFade8",
		}),
		"--sapContent_DisabledTextColor": () => fade("--sapTextColor", (100 - ("--sapContent_DisabledOpacity" * 100))),
		"--sapContent_ForegroundTextColor": () => contrast("--sapContent_ForegroundColor", "--sapTextColor", "--sapContent_ContrastTextColor", "--sapContent_ContrastTextThreshold"),
		"--sapContent_ForegroundColor": () => darken("--sapBaseColor", 6.1),

		"--sapShell_TextColor": () => contrast("--sapShellColor", "--sapTextColor", "--sapContent_ContrastTextColor", "--sapContent_ContrastTextThreshold"),
		"--sapShell_Hover_Background": () => darken("--sapShellColor", 7),
		"--sapShell_Active_Background": () => darken("--sapShellColor", 10),
		"--sapShell_Active_TextColor": () => contrast("--sapShell_Active_Background", "--sapTextColor", "--sapContent_ContrastTextColor", "--sapContent_ContrastTextThreshold"),
		"--sapButton_TextColor": () => contrast("--sapButton_Background", "--sapHighlightColor", "--sapContent_ContrastTextColor", "--sapContent_ContrastTextThreshold"),
		"--sapButton_Hover_Background": () => darken("--sapHighlightColor", 60),
		"--sapButton_Hover_TextColor": () => contrast("--sapButton_Hover_Background", "--sapHighlightColor", "--sapContent_ContrastTextColor", "--sapContent_ContrastTextThreshold"),
		"--sapButton_IconColor": () => contrast("--sapButton_Background", "--sapContent_IconColor", "--sapContent_ContrastIconColor", "--sapContent_ContrastTextThreshold"),
		"--sapButton_Active_TextColor": () => contrast("--sapButton_Active_Background", "--sapButton_TextColor", "--sapContent_ContrastTextColor", "--sapContent_ContrastTextThreshold"),
		"--sapButton_Emphasized_Background": () => darken("--sapBrandColor", 33),
		"--sapButton_Emphasized_BorderColor": () => lighten("--sapButton_Emphasized_Background", 20),
		"--sapButton_Emphasized_TextColor": () => contrast("--sapButton_Emphasized_Background", lighten("--sapPrimary2", 30), "--sapContent_ContrastTextColor", "--sapContent_ContrastTextThreshold"),
		"--sapButton_Emphasized_Hover_Background": () => darken("--sapButton_Emphasized_Background", 7),
		"--sapButton_Emphasized_Hover_TextColor": () => contrast("--sapButton_Emphasized_Hover_Background", lighten("--sapPrimary2", 30), "--sapContent_ContrastTextColor", "--sapContent_ContrastTextThreshold"),
		"--sapButton_Reject_Hover_Background": () => lighten("--sapErrorBackground", 5),
		"--sapButton_Reject_Hover_TextColor": () => contrast("--sapButton_Reject_Hover_Background", "--sapNegativeTextColor", "--sapContent_ContrastTextColor", "--sapContent_ContrastTextThreshold"),
		"--sapButton_Reject_Active_Background": () => darken("--sapNegativeElementColor", 5),
		"--sapButton_Reject_TextColor": () => contrast("--sapButton_Reject_Background", "--sapNegativeTextColor", "--sapContent_ContrastTextColor", "--sapContent_ContrastTextThreshold"),
		"--sapButton_Accept_Hover_Background": () => lighten("--sapSuccessBackground", 5),
		"--sapButton_Accept_Hover_TextColor": () => contrast("--sapButton_Accept_Hover_Background", "--sapPositiveTextColor", "--sapContent_ContrastTextColor", "--sapContent_ContrastTextThreshold"),
		"--sapButton_Accept_Active_Background": () => darken("--sapPositiveElementColor", 5),
		"--sapButton_Accept_TextColor": () => contrast("--sapButton_Accept_Background", "--sapPositiveTextColor", "--sapContent_ContrastTextColor", "--sapContent_ContrastTextThreshold"),
		"--sapButton_Selected_Hover_Background": () => darken("--sapButton_Selected_Background", 3),

		"--sapField_PlaceholderTextColor": () => darken("--sapContent_LabelColor", 10),
		"--sapField_ReadOnly_Background": () => fade(lighten("--sapField_Background", 8), 50),
		"--sapField_ReadOnly_BorderColor": () => darken("--sapField_BorderColor", 20),
		"--sapField_RequiredColor": () => lighten("--sapAccentColor2", 14),
		"--sapGroup_TitleBorderColor": () => lighten("--sapBaseColor", 20),
		"--sapGroup_TitleTextColor": () => contrast("--sapBackgroundColor", "--sapTitleColor", "--sapContent_ContrastTextColor", "--sapContent_ContrastTextThreshold"),
		"--sapGroup_ContentBorderColor": () => lighten("--sapGroup_ContentBackground", 10),
		"--sapToolbar_SeparatorColor": () => lighten("--sapBaseColor", 15),

		"--sapList_HeaderBackground": () => darken("--sapList_Background", 3),
		"--sapList_HeaderTextColor": () => contrast("--sapList_HeaderBackground", "--sapTitleColor", "--sapContent_ContrastTextColor", "--sapContent_ContrastTextThreshold"),
		"--sapList_BorderColor": () => lighten("--sapList_Background", 8),
		"--sapList_TextColor": () => contrast("--sapList_Background", "--sapTextColor", "--sapContent_ContrastTextColor", "--sapContent_ContrastTextThreshold"),
		"--sapList_SelectionBackgroundColor": () => darken(desaturate("--sapSelectedColor", 55), 48),
		"--sapList_Active_TextColor": () => contrast("--sapList_Active_Background", "--sapList_TextColor", "--sapContent_ContrastTextColor", "--sapContent_ContrastTextThreshold"),
		"--sapList_Hover_SelectionBackground": () => contrast("--sapList_SelectionBackgroundColor", darken("--sapList_SelectionBackgroundColor", 3), lighten("--sapList_SelectionBackgroundColor", 3)),
		"--sapList_Hover_Background": () => contrast("--sapList_Background", darken("--sapList_Background", 4), lighten("--sapList_Background", 3)),
		"--sapList_TableGroupHeaderBackground": () => darken("--sapList_Background", 6.1),
		"--sapList_TableGroupHeaderBorderColor": () => lighten("--sapList_BorderColor", 15),
		"--sapList_TableGroupHeaderTextColor": () => contrast("--sapList_TableGroupHeaderBackground", "--sapList_TextColor", "--sapContent_ContrastTextColor", "--sapContent_ContrastTextThreshold"),
		"--sapList_GroupHeaderBorderColor": () => lighten("--sapList_BorderColor", 20),
		"--sapList_FooterBackground": () => darken("--sapList_Background", 2),

		"--sapScrollBar_FaceColor": () => lighten("--sapBaseColor", 15),
		"--sapScrollBar_TrackColor": () => darken("--sapBaseColor", 4),
		"--sapScrollBar_Hover_FaceColor": () => darken("--sapScrollBar_FaceColor", 3),
		"--sapPageHeader_BorderColor": () => lighten("--sapPageHeader_Background", 8),
		"--sapPageHeader_TextColor": () => contrast("--sapPageHeader_Background", "--sapTextColor", "--sapContent_ContrastTextColor", "--sapContent_ContrastTextThreshold"),
		"--sapPageFooter_Background": () => darken("--sapShellColor", 5),
		"--sapPageFooter_BorderColor": () => lighten("--sapPageFooter_Background", 8),
		"--sapPageFooter_TextColor": () => contrast("--sapPageFooter_Background", "--sapTextColor", "--sapContent_ContrastTextColor", "--sapContent_ContrastTextThreshold"),
		"--sapTile_TitleTextColor": () => contrast("--sapTile_Background", "--sapTitleColor", "--sapContent_ContrastTextColor", "--sapContent_ContrastTextThreshold"),
		"--sapTile_TextColor": () => contrast("--sapTile_Background", "--sapContent_LabelColor", "--sapContent_ContrastTextColor", "--sapContent_ContrastTextThreshold"),
		"--sapTile_IconColor": () => contrast("--sapTile_Background", lighten("--sapShellColor", 35), "--sapContent_ContrastIconColor", "--sapContent_ContrastTextThreshold"),
		"--sapTile_Hover_Background": () => darken("--sapTile_Background", 4),
		"--sapTile_Active_Background": () => darken("--sapTile_Background", 4),
		"--sapInfobar_Hover_Background": () => lighten("--sapInfobar_Background", 5),
		"--sapInfobar_Active_Background": () => lighten("--sapInfobar_Background", 10),
		"--sapObjectHeader_BorderColor": () => lighten("--sapObjectHeader_Background", 8),

		"--sapUiLinkHover": () => lighten("--sapUiLink", 10),
		"--sapUiLinkInverted": () => darken("--sapUiLink", 48),
		"--sapUiCalloutShadow": () => concat({
			"static": "0px 6px 12px 0px",
			"var": "--sapContent_ShadowColorFade30",
		}),
		"--sapUiSegmentedButtonIconColor": () => contrast("--sapUiSegmentedButtonBackground", "--sapUiContentIconColor", "--sapUiContentContrastIconColor", "--sapUiContentContrastTextThreshold"),
		"--sapUiSegmentedButtonActiveIconColor": () => contrast("--sapUiSegmentedButtonActiveBackground", "--sapUiContentIconColor", "--sapUiContentContrastIconColor", "--sapUiContentContrastTextThreshold"),
		"--sapUiSegmentedButtonSelectedIconColor": () => contrast("--sapUiSegmentedButtonSelectedBackground", "--sapUiContentIconColor", "--sapUiContentContrastIconColor", "--sapUiContentContrastTextThreshold"),
		"--sapUiButtonFooterTextColor": () => contrast("--sapUiPageFooterBackground", "--sapUiButtonTextColor", "--sapUiContentContrastTextColor", "--sapUiContentContrastTextThreshold"),
		"--sapUiToggleButtonPressedTextColor": () => contrast("--sapUiToggleButtonPressedBackground", "--sapUiButtonTextColor", "--sapUiContentContrastTextColor", "--sapUiContentContrastTextThreshold"),
		"--sapUiToggleButtonPressedHoverBackground": () => darken("--sapUiToggleButtonPressedBackground", 3),
		"--sapUiSegmentedButtonTextColor": () => contrast("--sapUiSegmentedButtonBackground", "--sapUiButtonTextColor", "--sapUiContentContrastTextColor", "--sapUiContentContrastTextThreshold"),
		"--sapUiSegmentedButtonActiveTextColor": () => contrast("--sapUiSegmentedButtonActiveBackground", "--sapUiSegmentedButtonTextColor", "--sapUiContentContrastTextColor", "--sapUiContentContrastTextThreshold"),
		"--sapUiListSelectionHoverBackground": () => contrast("--sapUiListSelectionBackgroundColor", lighten("--sapUiListSelectionBackgroundColor", 3), darken("--sapUiListSelectionBackgroundColor", 3)),
		"--sapUiShadowHeader": () => concat({
			"static": "0 0 0.25rem 0",
			"var": "--sapContent_ShadowColorFade15",
		}, {
			"static": "inset 0 -0.0625rem 0 0",
			"var": "--sapUiObjectHeaderBorderColor",
		}),
		// used in Token-parameters.css
		"--sapUiButtonBackgroundDarken24": () => darken("--sapUiButtonBackground", 24),
		"--sapUiButtonHoverBorderColorLighten30": () => lighten("--sapUiButtonHoverBorderColor", 30),
	};

	return derivations;
};

module.exports = derivationsFactory;
