const derivationsFactory = ({ darken, lighten, contrast, fade, saturate, desaturate, mix, spin, concat }) => {
	const derivations = {
		"--sapHighlightColor": () => darken("--sapBrandColor", 10),
		"--sapBackgroundColorDefault": () => darken("--sapPrimary3", 3),
		"--sapBackgroundColor": () => darken("--sapPrimary3", 3),
		"--sapErrorBackground": () => lighten("--sapErrorColor", 59.5),
		"--sapWarningBackground": () => lighten("--sapWarningColor", 49),
		"--sapSuccessBackground": () => lighten("--sapSuccessColor", 69),
		"--sapInformationBackground": () => lighten("--sapInformativeColor", 55),
		"--sapNeutralBackground": () => lighten("--sapNeutralColor", 53),
		"--sapInformativeTextColor": () => darken("--sapInformativeColor", 20),
		"--sapHighlightTextColor": () => contrast("--sapHighlightColor", "--sapTextColor", "--sapContent_ContrastTextColor", "--sapContent_ContrastTextThreshold"),
		"--sapContent_ImagePlaceholderBackground": () => darken("--sapBaseColor", 20),
		"--sapContent_DisabledTextColor": () => fade("--sapTextColor", (100 - ("--sapContent_DisabledOpacity" * 100))),
		"--sapContent_ForegroundColor": () => darken("--sapBaseColor", 6.1),
		"--sapContent_ForegroundTextColor": () => contrast("--sapContent_ForegroundColor", "--sapTextColor", "--sapContent_ContrastTextColor", "--sapContent_ContrastTextThreshold"),

		"--sapShell_TextColor": () => contrast("--sapShellColor", "--sapTextColor", "--sapContent_ContrastTextColor", "--sapContent_ContrastTextThreshold"),
		"--sapShell_Hover_Background": () => darken("--sapShellColor", 7),
		"--sapShell_Active_Background": () => darken("--sapShellColor", 10),
		"--sapShell_Active_TextColor": () => contrast("--sapShell_Active_Background", "--sapTextColor", "--sapContent_ContrastTextColor", "--sapContent_ContrastTextThreshold"),

		"--sapButton_Hover_Background": () => lighten("--sapHighlightColor", 63),
		"--sapButton_TextColor": () => contrast("--sapButton_Background", "--sapHighlightColor", "--sapContent_ContrastTextColor", "--sapContent_ContrastTextThreshold"),
		"--sapButton_Active_TextColor": () => contrast("--sapButton_Active_Background", "--sapButton_TextColor", "--sapContent_ContrastTextColor", "--sapContent_ContrastTextThreshold"),
		"--sapButton_Hover_TextColor": () => contrast("--sapButton_Hover_Background", "--sapHighlightColor", "--sapContent_ContrastTextColor", "--sapContent_ContrastTextThreshold"),
		"--sapButton_Emphasized_Hover_Background": () => darken("--sapButton_Emphasized_Background", 7),
		"--sapButton_Emphasized_Active_Background": () => darken("--sapButton_Emphasized_Background", 10),
		"--sapButton_Emphasized_TextColor": () => contrast("--sapButton_Emphasized_Background", darken("--sapPrimary2", 10), "--sapContent_ContrastTextColor", "--sapContent_ContrastTextThreshold"),
		"--sapButton_Reject_TextColor": () => contrast("--sapButton_Reject_Background", "--sapNegativeTextColor", "--sapContent_ContrastTextColor", "--sapContent_ContrastTextThreshold"),
		"--sapButton_Accept_TextColor": () => contrast("--sapButton_Accept_Background", "--sapPositiveTextColor", "--sapContent_ContrastTextColor", "--sapContent_ContrastTextThreshold"),
		"--sapButton_Reject_Active_Background": () => darken("--sapNegativeElementColor", 5),
		"--sapButton_IconColor": () => contrast("--sapButton_Background", "--sapContent_IconColor", "--sapContent_ContrastIconColor", "--sapContent_ContrastTextThreshold"),
		"--sapButton_Accept_Active_Background": () => darken("--sapPositiveElementColor", 5),

		"--sapField_PlaceholderTextColor": () => lighten("--sapContent_LabelColor", 4),
		"--sapField_ReadOnly_Background": () => fade(darken("--sapField_Background", 5), 50),
		"--sapField_RequiredColor": () => darken("--sapAccentColor2", 2),
		"--sapGroup_TitleBorderColor": () => darken("--sapBaseColor", 15),
		"--sapGroup_TitleTextColor": () => contrast("--sapBackgroundColor", "--sapTitleColor", "--sapContent_ContrastTextColor", "--sapContent_ContrastTextThreshold"),
		"--sapGroup_ContentBorderColor": () => darken("--sapGroup_ContentBackground", 15),

		"--sapList_TextColor": () => contrast("--sapList_Background", "--sapTextColor", "--sapContent_ContrastTextColor", "--sapContent_ContrastTextThreshold"),
		"--sapList_HeaderTextColor": () => contrast("--sapList_HeaderBackground", "--sapTitleColor", "--sapContent_ContrastTextColor", "--sapContent_ContrastTextThreshold"),
		"--sapList_BorderColor": () => darken("--sapList_Background", 10.15),
		"--sapList_FooterBackground": () => darken("--sapList_Background", 2),
		"--sapList_SelectionBackgroundColor": () => lighten(desaturate("--sapSelectedColor", 24), 61),
		"--sapList_HeaderBackground": () => darken("--sapList_Background", 5),
		"--sapList_Hover_Background": () => contrast("--sapList_Background", darken("--sapList_Background", 2), lighten("--sapList_Background", 2)),
		"--sapList_Active_TextColor": () => contrast("--sapList_Active_Background", "--sapList_TextColor", "--sapContent_ContrastTextColor", "--sapContent_ContrastTextThreshold"),
		"--sapList_TableGroupHeaderBackground": () => darken("--sapList_Background", 6.1),
		"--sapList_TableGroupHeaderBorderColor": () => darken("--sapList_BorderColor", 4.9),
		"--sapList_TableGroupHeaderTextColor": () => contrast("--sapList_TableGroupHeaderBackground", "--sapList_TextColor", "--sapContent_ContrastTextColor", "--sapContent_ContrastTextThreshold"),

		"--sapScrollBar_FaceColor": () => darken("--sapBaseColor", 30),
		"--sapScrollBar_TrackColor": () => lighten("--sapScrollBar_FaceColor", 30),
		"--sapScrollBar_Hover_FaceColor": () => darken("--sapScrollBar_FaceColor", 3),
		"--sapInfobar_Hover_Background": () => darken("--sapInfobar_Background", 3),
		"--sapObjectHeader_BorderColor": () => darken("--sapObjectHeader_Background", 15),
		"--sapPageHeader_BorderColor": () => darken("--sapPageHeader_Background", 15),
		"--sapPageHeader_TextColor": () => contrast("--sapPageHeader_Background", "--sapTextColor", "--sapContent_ContrastTextColor", "--sapContent_ContrastTextThreshold"),
		"--sapPageFooter_TextColor": () => contrast("--sapPageFooter_Background", "--sapTextColor", "--sapContent_ContrastTextColor", "--sapContent_ContrastTextThreshold"),
		"--sapPageFooter_BorderColor": () => darken("--sapPageFooter_Background", 15),

		"--sapTile_TitleTextColor": () => contrast("--sapTile_Background", "--sapTitleColor", "--sapContent_ContrastTextColor", "--sapContent_ContrastTextThreshold"),
		"--sapTile_TextColor": () => contrast("--sapTile_Background", "--sapContent_LabelColor", "--sapContent_ContrastTextColor", "--sapContent_ContrastTextThreshold"),
		"--sapTile_IconColor": () => contrast("--sapTile_Background", lighten("--sapShellColor" ,20), "--sapContent_ContrastIconColor", "--sapContent_ContrastTextThreshold"),
		"--sapToolbar_SeparatorColor": () => darken("--sapBaseColor", 15),

		"--sapUiLinkHover": () => darken("--sapUiLink", 10),
		"--sapUiLinkInverted": () => lighten("--sapUiLink", 48),
		"--sapUiNotificationBarBG": () => fade("--sapUiPrimary7", 98),
		"--sapUiNotifierSeparator": () => darken("--sapUiPrimary7", 20),
		"--sapUiNotificationBarBorder": () => lighten("--sapUiPrimary7", 20),

		"--sapUiButtonFooterTextColor": () => contrast("--sapUiPageFooterBackground", "--sapUiButtonTextColor", "--sapUiContentContrastTextColor", "--sapUiContentContrastTextThreshold"),
		"--sapUiSegmentedButtonIconColor": () => contrast("--sapUiSegmentedButtonBackground", "--sapUiContentIconColor", "--sapUiContentContrastIconColor", "--sapUiContentContrastTextThreshold"),
		"--sapUiSegmentedButtonActiveIconColor": () => contrast("--sapUiSegmentedButtonActiveBackground", "--sapUiContentIconColor", "--sapUiContentContrastIconColor", "--sapUiContentContrastTextThreshold"),
		"--sapUiSegmentedButtonSelectedIconColor": () => contrast("--sapUiSegmentedButtonSelectedBackground", "--sapUiContentIconColor", "--sapUiContentContrastIconColor", "--sapUiContentContrastTextThreshold"),
		"--sapUiSegmentedButtonTextColor": () => contrast("--sapUiSegmentedButtonBackground", "--sapUiButtonTextColor", "--sapUiContentContrastTextColor", "--sapUiContentContrastTextThreshold"),
		"--sapUiSegmentedButtonActiveTextColor": () => contrast("--sapUiSegmentedButtonActiveBackground", "--sapUiSegmentedButtonTextColor", "--sapUiContentContrastTextColor", "--sapUiContentContrastTextThreshold"),
		"--sapUiToggleButtonPressedTextColor": () => contrast("--sapUiToggleButtonPressedBackground", "--sapUiButtonTextColor", "--sapUiContentContrastTextColor", "--sapUiContentContrastTextThreshold"),
		"--sapUiToggleButtonPressedHoverBackground": () => lighten("--sapUiToggleButtonPressedBackground", 3),
		"--sapUiListSelectionHoverBackground": () => contrast("--sapUiListSelectionBackgroundColor", darken("--sapUiListSelectionBackgroundColor", 3), lighten("--sapUiListSelectionBackgroundColor", 3)),

		// used in Token-parameters.css
		"--sapUiButtonBackgroundDarken24": () => darken("--sapUiButtonBackground", 24),
		"--sapUiButtonHoverBorderColorLighten30": () => lighten("--sapUiButtonHoverBorderColor", 30),

		// used sapUiShadowLevel (0 to 3)
		"--sapUiContentShadowColorFade10": () => fade("--sapUiContentShadowColor", 10),
		"--sapUiContentShadowColorFade15": () => fade("--sapUiContentShadowColor", 15),
		"--sapUiContentShadowColorFade30": () => fade("--sapUiContentShadowColor", 30),

		"--sapUiShadowHeader": () => concat({
			static: "0 0 0.25rem 0",
			var: "--sapUiContentShadowColorFade15",
		}, {
			static: "inset 0 -0.0625rem 0 0",
			var: "--sapUiObjectHeaderBorderColor",
		}),

		"--sapUiShadowLevel0": () => concat({
			static: "0 0 0 1px",
			var: "--sapUiContentShadowColorFade10",
		}, {
			static: "0 0.125rem 0.5rem 0",
			var: "--sapUiContentShadowColorFade10",
		}),

		"--sapUiShadowLevel1": () => concat({
			static: "0 0 0 1px",
			var: "--sapUiContentShadowColorFade15"
		}, {
			static: "0 0.125rem 0.5rem 0",
			var: "--sapUiContentShadowColorFade30",
		}),

		"--sapUiShadowLevel2": () => concat({
			static: "0 0 0 1px",
			var: "--sapUiContentShadowColorFade15",
		}, {
			static: "0 0.625rem 1.875rem 0",
			var: "--sapUiContentShadowColorFade30",
		}),

		"--sapUiShadowLevel3": () => concat({
			static: "0 0 0 1px",
			var: "--sapUiContentShadowColorFade15"
		}, {
			static: "0 1.25rem 5rem 0",
			var: "--sapUiContentShadowColorFade30",
		}),

		"--sapUiCalloutShadow": () => concat({
			static: "0px 6px 12px 0px",
			var: "--sapUiContentShadowColorFade30",
		})
	};

	return derivations;
}

module.exports = derivationsFactory;
