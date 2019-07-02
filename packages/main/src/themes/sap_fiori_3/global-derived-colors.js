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
}

module.exports = derivationsFactory;
