import Configuration from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/Configuration";

class ShellBarTemplateContext {
	static calculate(state) {
		const hiddenIcons = state._itemsInfo.filter(info => {
			const isHidden = (info.classes.indexOf("sapWCShellBarHiddenIcon") !== -1);
			const isSet = info.classes.indexOf("sapWCShellBarUnsetIcon") === -1;
			const isOverflowIcon = info.classes.indexOf("sapWCShellBarOverflowIcon") !== -1;

			return isHidden && isSet && !isOverflowIcon;
		});

		const isRTL = Configuration.getRTL();

		return {
			ctr: state,
			_hiddenIcons: hiddenIcons,
			popoverHorizontalAlign: isRTL ? "Left" : "Right",
			interactiveLogo: state._breakpointSize === "S",
			styles: {
				searchField: {
					[isRTL ? "left" : "right"]: state._searchField.right,
					"top": `${parseInt(state._searchField.top)}px`,
				},
			},
			classes: {
				wrapper: {
					"sapWCShellBarWrapper": true,
					[`sapWCShellBarSize${state._breakpointSize}`]: true,
					"sapWCShellBarHasSearchField": state.searchField,
					"sapWCShellBarBlockLayerShown": state._showBlockLayer,
					"sapWCShellBarHasNotifications": !!state.notificationCount,
				},
				leftContainer: {
					"sapWCShellBarOverflowContainer": true,
					"sapWCShellBarOverflowContainerLeft": true,
				},
				logo: {
					"sapWCShellBarLogo": true,
				},
				button: {
					"sapWCShellBarMenuButtonNoTitle": !state.primaryTitle,
					"sapWCShellBarMenuButtonNoLogo": !state.logo,
					"sapWCShellBarMenuButtonMerged": state._breakpointSize === "S",
					"sapWCShellBarMenuButton": true,
				},
				buttonTitle: {
					"sapWCShellBarMenuButtonTitle": true,
				},
				secondaryTitle: {
					"sapWCShellBarSecondaryTitle": true,
				},
				arrow: {
					"sapWCShellBarMenuButtonArrow": true,
				},
				searchField: {
					"sapWCShellBarSearchField": true,
					"sapWCShellBarSearchFieldHidden": !state._showBlockLayer,
				},
				blockLayer: {
					"sapWCShellBarBlockLayer": true,
					"sapWCShellBarBlockLayerHidden": !state._showBlockLayer,
				},
			},
		};
	}
}

export default ShellBarTemplateContext;
