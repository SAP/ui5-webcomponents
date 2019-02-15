import Bootstrap from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/Bootstrap";
import URI from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/types/URI";
import WebComponent from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/WebComponent";
import ShadowDOM from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/compatibility/ShadowDOM";
import ResizeHandler from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/delegate/ResizeHandler";
import Integer from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/types/Integer";
import ItemNavigation from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/delegate/ItemNavigation";

// Template
import ShellBarRenderer from "./build/compiled/ShellBarRenderer.lit";
import ShellBarTemplateContext from "./ShellBarTemplateContext";

// Styles
import fiori3 from "./themes/sap_fiori_3/ShellBar.less";

ShadowDOM.registerStyle("sap_fiori_3", "ShellBar.css", fiori3);

/**
 * @public
 */
const metadata = {
	tag: "ui5-shellbar",
	styleUrl: [
		"ShellBar.css",
	],
	properties: /** @lends  sap.ui.webcomponents.main.ShellBar.prototype */ {

		/**
		 * Defines the <code>logo</code> source URI.
		 * @type {String}
		 * @public
		 */
		logo: {
			type: URI,
			defaultValue: null,
		},

		/**
		 * Defines the <code>primaryTitle</code>.
		 * @type {String}
		 * @public
		 */
		primaryTitle: {
			type: String,
			defaultValue: "",
		},

		/**
		 * Defines the <code>secondaryTitle</code>.
		 * <br><br>
		 * <b>Note:</b> On smaller screen width, the <code>secondaryTitle</code> would be hidden.
		 * @type {String}
		 * @public
		 */
		secondaryTitle: {
			type: String,
			defaultValue: "",
		},

		/**
		 * Defines the <code>notificationCount</code>,
		 * displayed in the notification icon top-right corner.
		 * @type {String}
		 * @public
		 */
		notificationCount: {
			type: String,
		},

		/**
		 * Defines, if the notification icon would be displayed.
		 * @type {boolean}
		 * @public
		 */
		showNotification: {
			type: Boolean,
		},

		/**
		 * Defines, if the search field would be displayed.
		 * @type {boolean}
		 * @public
		 */
		showSearch: {
			type: Boolean,
		},

		/**
		 * Defines, if the profile icon would be displayed.
		 * @type {boolean}
		 * @public
		 */
		showProfile: {
			type: Boolean,
		},

		/**
		 * Defines, if the product switch icon would be displayed.
		 * @type {boolean}
		 * @public
		 */
		showProductSwitch: {
			type: Boolean,
		},

		/**
		 * Defines, if the product CoPilot icon would be displayed.
		 * @type {boolean}
		 * @public
		 */
		showCoPilot: {
			type: Boolean,
		},

		_breakpointSize: {
			type: String,
			defaultValue: "",
		},

		_itemsInfo: {
			type: Object,
		},

		_popupSettings: {
			type: Object,
		},

		_actionList: {
			type: Object,
		},

		_showBlockLayer: {
			type: Boolean,
		},

		_searchIconLeft: {
			type: Integer,
		},

		_searchField: {
			type: Object,
		},

		_header: {
			type: Object,
		},
	},

	slots: /** @lends  sap.ui.webcomponents.main.ShellBar.prototype */ {
		/**
		 * Defines the <code>ui5-shellbar</code> aditional items.
		 * </br></br>
		 * <b>Note:</b>
		 * You can use the &nbsp;&lt;ui5-shellbar-item>&lt;/ui5-shellbar-item>.
		 *
		 * @type {HTMLElement}
		 * @slot
		 * @public
		 */
		items: {
			type: HTMLElement,
			multiple: true,
		},

		/**
		 * Defines the <code>ui5-input</code>, that will be used as a search field.
		 *
		 * @type {HTMLElement[]}
		 * @slot
		 * @public
		 */
		input: {
			type: HTMLElement,
		},
	},
	defaultSlot: "items",
	events: /** @lends sap.ui.webcomponents.main.ShellBar.prototype */ {
		/**
		 * Fired, when the primaryTitle is pressed.
		 *
		 * @event
		 * @public
		 */
		titlePress: {},

		/**
		 *
		 * Fired, when the notification icon is pressed.
		 *
		 *
		 * @event
		 * @public
		 */
		notificationPress: {},

		/**
		 * Fired, when the profile icon is pressed.
		 *
		 * @event
		 * @public
		 */
		profilePress: {},

		/**
		 * Fired, when the product switch icon is pressed.
		 *
		 * @event
		 * @public
		 */
		productSwitchPress: {},
	},
};

/**
 * @class
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-shellbar</code> is meant to serve as an application header
 * and includes numerous built-in features, such as: logo, profile icon, title, search field, notifications and so on.
 * <br><br>
 * <h3>ES6 Module Import</h3>
 * <code>import "@ui5/webcomponents/dist/ShellBar";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.ShellBar
 * @extends sap.ui.webcomponents.base.WebComponent
 * @tagname ui5-shellbar
 * @appenddocs ShellBarItem
 * @public
 */
class ShellBar extends WebComponent {
	static get metadata() {
		return metadata;
	}

	static get renderer() {
		return ShellBarRenderer;
	}

	static get calculateTemplateContext() {
		return ShellBarTemplateContext.calculate;
	}

	static get FIORI_3_BREAKPOINTS() {
		return {
			S: 559,
			M: 1023,
			L: 1439,
			XL: 1919,
			XXL: 1920,
		};
	}

	constructor(props) {
		super(props);

		const that = this;

		this.__overflowItems = [];
		this._itemsInfo = [];

		this._popupSettings = {
			classes: "sapWCShellBarPopover sapWCShellBarPopoverHidden",
			focusout: event => {
				const popover = this.shadowRoot.querySelector(".sapWCShellBarPopover");

				if (!popover.contains(event.relatedTarget)) {
					this._popupSettings = Object.assign({}, this._popupSettings, {
						style: `left: ${-100000}px;`,
						classes: `sapWCShellBarPopoverHidden sapWCShellBarPopover`,
					});
				}
			},
		};

		this._actionList = {
			itemPress: event => {
				const overflowButton = this.shadowRoot.querySelector(".sapWCShellBarOverflowIcon");

				this._actionPressed = true;
				setTimeout(() => {
					overflowButton.focus();
				}, 0);
			},
		};

		this._header = {
			press: event => {
				this.fireEvent("titlePress");
			},
		};

		this.__lastOverflowCount = -1;

		this._itemNav = new ItemNavigation(this);

		this._itemNav.getItemsCallback = () => {
			const items = this._itemsInfo.filter(info => {
				if (info.classes.indexOf("sapWCShellBarHiddenIcon") === -1) {
					return true;
				}

				return false;
			}).sort((item1, item2) => {
				return item1.order < item2.order ? -1 : 1;
			});

			this._itemNav.rowSize = items.length;

			return items;
		};

		this._itemNav.setItemsCallback = items => {
			this._itemsInfo = this._itemsInfo.map(item => {
				const pairItem = items.find(focusabledItem => {
					return (focusabledItem.id === item.id);
				});

				item.tabIndex = pairItem ? pairItem.tabIndex : "-1";

				return item;
			});
		};

		this._delegates.push(this._itemNav);

		this._searchField = {
			focusout: event => {
				this._showBlockLayer = false;
			},
		};

		this.__handleResize = event => {
			const width = that.getBoundingClientRect().width;
			const breakpoints = Object.keys(ShellBar.FIORI_3_BREAKPOINTS).sort((key1, key2) => ShellBar.FIORI_3_BREAKPOINTS[key1] < ShellBar.FIORI_3_BREAKPOINTS[key2]);
			const size = breakpoints.find(bp1 => width < ShellBar.FIORI_3_BREAKPOINTS[bp1]) || ShellBar.FIORI_3_BREAKPOINTS.XXL;
			const rightContainer = that.shadowRoot.querySelector(".sapWCShellBarOverflowContainerRight");
			const icons = rightContainer.querySelectorAll(".sapWCShellBarItemIconMode");

			if (that._breakpointSize !== size) {
				that._breakpointSize = size;
			}

			const overflowCount = [].filter.call(icons, icon => {
				return icon.offsetLeft < rightContainer.offsetLeft;
			}).length;

			if (this.__lastOverflowCount === overflowCount) {
				return;
			}

			this.__lastOverflowCount = overflowCount;

			const itemsByPriority = this.__getAllItems(!!overflowCount).sort((item1, item2) => {
				return item1.priority > item2.priority ? 1 : -1;
			});

			for (let i = 0; i < overflowCount; i++) {
				itemsByPriority[i].classes = `${itemsByPriority[i].classes} sapWCShellBarHiddenIcon`;
				itemsByPriority[i].style = `order: -1`;
			}

			this._showOverflowButton = !!overflowCount;
			this._itemsInfo = itemsByPriority;

			const overflowButton = this.shadowRoot.querySelector(".sapWCShellBarOverflowIcon");
			const popover = this.shadowRoot.querySelector(".sapWCShellBarPopover");

			if (overflowButton) {
				this._popupSettings = Object.assign({}, this._popupSettings, {
					style: `left: ${overflowButton.offsetLeft - (popover.getBoundingClientRect().width) + 36}px;`,
					classes: "sapWCShellBarPopover sapWCShellBarPopoverHidden",
				});
			}

			if (size === "S") {
				this._itemsInfo = this.__getAllItems(true).map(info => {
					const shouldStayOnScreen = info.classes.indexOf("sapWCShellBarOverflowIcon") !== -1 || info.classes.indexOf("sapWCShellBarImageButton") !== -1;

					return Object.assign({}, info, {
						classes: `${info.classes} ${shouldStayOnScreen ? "" : "sapWCShellBarHiddenIcon"}`,
						style: `order: ${shouldStayOnScreen ? 1 : -1}`,
					});
				});
			}
		};
	}

	onBeforeRendering() {
		this._itemNav.init();
	}

	ontap(event) {}

	_toggleActionPopover() {
		const overflowButton = this.shadowRoot.querySelector(".sapWCShellBarOverflowIcon");
		const popover = this.shadowRoot.querySelector(".sapWCShellBarPopover");
		const showPopover = this._popupSettings.classes.indexOf("sapWCShellBarPopoverHidden") !== -1;

		this._popupSettings = Object.assign({}, this._popupSettings, {
			style: `left: ${showPopover ? overflowButton.offsetLeft - (popover.getBoundingClientRect().width) + 36 : -100000}px;`,
			classes: `${showPopover ? "" : "sapWCShellBarPopoverHidden"} sapWCShellBarPopover`,
		});

		if (showPopover) {
			setTimeout(() => {
				popover.querySelector("ui5-li").shadowRoot.querySelector("li").focus();
			}, 0);
		}
	}

	_isActionPopoverOpen() {
		const popover = this.shadowRoot.querySelector(".sapWCShellBarPopover");

		return !popover.classList.contains("sapWCShellBarPopoverHidden");
	}

	onsapescape() {
		const overflowButton = this.shadowRoot.querySelector(".sapWCShellBarOverflowIcon");
		const searchButton = this.shadowRoot.querySelector(".sapWCShellBarSearchIcon");

		if (this._showBlockLayer) {
			this._showBlockLayer = false;

			setTimeout(() => {
				searchButton.focus();
			}, 0);
		}

		if (this._isActionPopoverOpen()) {
			this._toggleActionPopover();

			setTimeout(() => {
				overflowButton.focus();
			}, 0);
		}
	}

	onkeydown(event) {
	}

	onEnterDOM() {
		ResizeHandler.register(this, this.__handleResize);
	}

	onExitDOM() {
		ResizeHandler.deregister(this, this.__handleResize);
	}

	_handleSearchIconPress(event) {
		const searchField = this.shadowRoot.querySelector(`#${this._id}-searchfield-wrapper`);
		const triggeredByOverflow = event.target.tagName.toLowerCase() === "ui5-li";
		const overflowButton = this.shadowRoot.querySelector(".sapWCShellBarOverflowIcon");

		this._searchIconLeft = triggeredByOverflow ? overflowButton.offsetLeft : event.target.offsetLeft;
		this._showBlockLayer = true;

		setTimeout(() => {
			const inputSlot = searchField.children[0];

			if (inputSlot) {
				inputSlot.assignedNodes()[0].focus();
			}
		}, 0);
	}

	_handleCustomActionPress(event) {
		const refItemId = event.target.getAttribute("data-ui5-external-action-item-id");

		if (refItemId) {
			this.items.find(item => item.shadowRoot.querySelector(`#${refItemId}`)).fireEvent("press");
		}
	}

	_handleOverflowPress(event) {
		this._toggleActionPopover();
	}

	_handleNotificationPress(event) {
		this.fireEvent("notificationPress");
	}

	_handleProfilePress(event) {
		this.fireEvent("profilePress");
	}

	_handleProductSwitchPress(event) {
		this.fireEvent("productSwitchPress");
	}

	__getAllItems(showOverflowButton) {
		const items = [
			{
				src: "sap-icon://search",
				text: "Search",
				classes: "sapWCShellBarItemIconMode sapWCShellBarIconButton sapWCShellBarSearchIcon",
				priority: 2,
				order: 1,
				style: `order: ${1}`,
				id: `${this._id}-item-${1}`,
				press: this._handleSearchIconPress.bind(this),
				show: this.showSearch,
			},
			...this.items.map((item, index) => {
				return {
					src: item.src,
					id: item._id,
					refItemid: item._id,
					text: item.text,
					classes: "sapWCShellBarItemIconMode sapWCShellBarIconButton",
					priority: 1,
					order: 2,
					style: `order: ${2}`,
					show: true,
					press: this._handleCustomActionPress.bind(this),
				};
			}),
			{
				src: "sap-icon://bell",
				text: "Notifications",
				classes: "sapWCShellBarItemIconMode sapWCShellBarIconButton sapWCShellBarBellIcon",
				priority: 2,
				order: 3,
				style: `order: ${3}`,
				id: `${this._id}-item-${2}`,
				show: this.showNotification,
				press: this._handleNotificationPress.bind(this),
			},
			{
				src: "",
				text: "Person",
				classes: "sapWCShellBarItemIconMode sapWCShellBarImageButton",
				priority: 3,
				subclasses: "sapWCShellBarImageButtonImage",
				order: 5,
				style: `order: ${5}`,
				id: `${this._id}-item-${3}`,
				show: this.showProfile,
				press: this._handleProfilePress.bind(this),
			},
			{
				src: "sap-icon://grid",
				text: "Product Switch",
				classes: "sapWCShellBarItemIconMode sapWCShellBarIconButton",
				priority: 2,
				order: 6,
				style: `order: ${6}`,
				id: `${this._id}-item-${4}`,
				show: this.showProductSwitch,
				press: this._handleProductSwitchPress.bind(this),
			},
		];

		items.splice(items.length - 3, 0, {
			src: "sap-icon://overflow",
			text: "Test",
			classes: `${showOverflowButton ? "" : "sapWCShellBarHiddenIcon"} sapWCOverflowButtonShown sapWCShellBarItemIconMode sapWCShellBarIconButton sapWCShellBarOverflowIcon`,
			priority: 3,
			order: 4,
			style: `order: ${showOverflowButton ? 4 : -1}`,
			id: `${this.id}-item-${5}`,
			press: this._handleOverflowPress.bind(this),
			show: true,
		});

		return items.filter(item => item.show);
	}
}

Bootstrap.boot().then(_ => {
	ShellBar.define();
});

export default ShellBar;
