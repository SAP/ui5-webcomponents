import IconColor from "./types/IconColor.js";

class TabContainerTemplateContext {
	static calculate(state) {
		const context = {
			ctr: state,
			classes: {
				main: {
					"ui5-tab-container": true,
				},
				header: {
					"ui5-tc__header": true,
					"ui5-tc__header--scrollable": state._scrollable,
				},
				headerScrollContainer: {
					"ui-tc__headerScrollContainer": true,
				},
				headerList: {
					"ui5-tc__headerList": true,
				},
				separator: {
					"ui5-tc__separator": true,
				},
				headerBackArrow: {
					"ui5-tc__headerArrow": true,
					"ui5-tc__headerArrowLeft": true,
					"ui5-tc__headerArrow--visible": state._scrollableBack,
				},
				headerForwardArrow: {
					"ui5-tc__headerArrow": true,
					"ui5-tc__headerArrowRight": true,
					"ui5-tc__headerArrow--visible": state._scrollableForward,
				},
				overflowButton: {
					"ui-tc__overflowButton": true,
					"ui-tc__overflowButton--visible": state._scrollable,
				},
				content: {
					"ui5-tc__content": true,
					"ui5-tc__content--collapsed": state.collapsed,
				},
			},
			renderItems: [],
			mixedMode: state.items.some(item => item.icon) && state.items.some(item => item.text),
		};

		context.renderItems = context.ctr.items.map((item, index) => {
			const isSeparator = item.isSeparator();

			if (isSeparator) {
				return { isSeparator, _tabIndex: item._tabIndex, _id: item._id };
			}

			return {
				item,
				isMixedModeTab: !item.icon && context.mixedMode,
				isTextOnlyTab: !item.icon && !context.mixedMode,
				isIconTab: item.icon,
				position: index + 1,
				disabled: item.disabled || undefined,
				selected: item.selected || false,
				ariaLabelledBy: calculateAriaLabelledBy(item),
				contentItemClasses: calculateContentItemClasses(item),
				headerItemClasses: calculateHeaderItemClasses(item, context),
				headerItemContentClasses: calculateHeaderItemContentClasses(item),
				headerItemIconClasses: calculateHeaderItemIconClasses(item),
				headerItemSemanticIconClasses: calculateHeaderItemSemanticIconClasses(item),
				headerItemTextClasses: calculateHeaderItemTextClasses(item),
				headerItemAdditionalTextClasses: calculateHeaderItemAdditionalTextClasses(item),
				overflowItemClasses: calculateOverflowItemClasses(item),
				overflowItemContentClasses: calculateOverflowItemContentClasses(item),
				overflowItemState: calculateOverflowItemState(item),
			};
		});

		return context;
	}
}

const calculateAriaLabelledBy = item => {
	const labels = [];

	if (item.text) {
		labels.push(`${item._id}-text`);
	}

	if (item.additionalText) {
		labels.push(`${item._id}-additionalText`);
	}

	if (item.icon) {
		labels.push(`${item._id}-icon`);
	}

	return labels.join(" ");
};

const calculateHeaderItemClasses = (item, context) => {
	const classes = ["ui5-tc__headerItem"];

	if (item.selected) {
		classes.push("ui5-tc__headerItem--selected");
	}

	if (item.disabled) {
		classes.push("ui5-tc__headerItem--disabled");
	}

	if (!item.icon && !context.mixedMode) {
		classes.push("ui5-tc__headerItem--textOnly");
	}

	if (item.icon) {
		classes.push("ui5-tc__headerItem--withIcon");
	}

	if (!item.icon && context.mixedMode) {
		classes.push("ui5-tc__headerItem--mixedMode");
	}

	if (item.iconColor !== IconColor.Default) {
		classes.push(`ui5-tc__headerItem--${item.iconColor.toLowerCase()}`);
	}

	return classes.join(" ");
};

const calculateHeaderItemContentClasses = item => {
	const classes = ["ui5-tc__headerItemContent"];

	return classes.join(" ");
};

const calculateHeaderItemIconClasses = item => {
	const classes = ["ui5-tc-headerItemIcon"];

	return classes.join(" ");
};

const calculateHeaderItemSemanticIconClasses = item => {
	const classes = ["ui5-tc-headerItemSemanticIcon"];

	if (item.iconColor !== IconColor.Default) {
		classes.push(`ui5-tc-headerItemSemanticIcon--${item.iconColor.toLowerCase()}`);
	}

	return classes.join(" ");
};

const calculateHeaderItemTextClasses = item => {
	const classes = ["ui5-tc__headerItemText"];

	return classes.join(" ");
};

const calculateHeaderItemAdditionalTextClasses = item => {
	const classes = ["ui5-tc__headerItemAdditionalText"];

	return classes.join(" ");
};

const calculateOverflowItemClasses = item => {
	const classes = ["ui5-tc__overflowItem"];

	if (item.iconColor !== IconColor.Default) {
		classes.push(`ui5-tc__overflowItem--${item.iconColor.toLowerCase()}`);
	}

	if (item.disabled) {
		classes.push("ui5-tc__overflowItem--disabled");
	}

	return classes.join(" ");
};

const calculateOverflowItemContentClasses = item => {
	const classes = ["ui5-tc__overflowItemContent"];

	return classes.join(" ");
};

const calculateOverflowItemState = item => {
	return item.disabled ? "Inactive" : "Active";
};

const calculateContentItemClasses = item => {
	const classes = ["ui5-tc__contentItem"];

	if (!item.selected) {
		classes.push(" ui5-tc__contentItem--hidden");
	}

	return classes.join(" ");
};

export default TabContainerTemplateContext;
