import { getRTL } from "@ui5/webcomponents-base/src/Configuration.js";

class ShellBarTemplateContext {
	static calculate(state) {
		const hiddenIcons = state._itemsInfo.filter(info => {
			const isHidden = (info.classes.indexOf("sapWCShellBarHiddenIcon") !== -1);
			const isSet = info.classes.indexOf("sapWCShellBarUnsetIcon") === -1;
			const isOverflowIcon = info.classes.indexOf("sapWCShellBarOverflowIcon") !== -1;

			return isHidden && isSet && !isOverflowIcon;
		});

		const isRTL = getRTL();
		const interactiveLogo = state._breakpointSize === "S";

		return {
			ctr: state,
			_hiddenIcons: hiddenIcons,
			popoverHorizontalAlign: isRTL ? "Left" : "Right",
			interactiveLogo,
			showArrowDown: state.primaryTitle || (state.logo && interactiveLogo),
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
					"sapWCShellBarMenuButtonInteractive": !!state.menuItems.length,
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
