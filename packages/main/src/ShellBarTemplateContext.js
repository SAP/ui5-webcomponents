class ShellBarTemplateContext {
	static calculate(state) {
		return {
			ctr: state,
			_hiddenIcons: state._itemsInfo.filter(info => {
				return (info.classes.indexOf("sapWCShellBarHiddenIcon") !== -1);
			}),
			interactiveLogo: state._breakpointSize === "S",
			styles: {
				searchField: {
					"left": `${parseInt(state._searchIconLeft) - 320}px`,
				},
			},
			classes: {
				wrapper: {
					"sapWCShellBarWrapper": true,
					[`sapWCShellBarSize${state._breakpointSize}`]: true,
					"sapWCShellBarHasSearchField": state._showSearchField,
					"sapWCShellBarBlockLayerShown": state._showBlockLayer,
				},
				leftContainer: {
					"sapWCShellBarOverflowContainer": true,
					"sapWCShellBarOverflowContainerLeft": true,
					"sapWCShellBarOverflowContainerLeftWithoutMaxWidth": !state.showCoPilot,
				},
				logo: {
					"sapWCShellBarLogo": true,
				},
				button: {
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
				overflowButton: {
					"sapWCOverflowButtonShown": state._showOverflowButton,
					"sapWCShellBarItemIconMode": true,
					"sapWCShellBarIconButton": true,
					"sapWCShellBarOverflowIcon": true,
				},

				searchField: {
					"sapWCShellBarSearchField": true,
					"sapWCShellBarDisplayNone": !state._showBlockLayer,
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
