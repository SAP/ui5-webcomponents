import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import { getIconData, getIconDataSync, IconData } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { I18nText } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { isSpace, isEnter } from "@ui5/webcomponents-base/dist/Keys.js";
import executeTemplate from "@ui5/webcomponents-base/dist/renderer/executeTemplate.js";
import IconTemplate from "./generated/templates/IconTemplate.lit.js";
import IconDesign from "./types/IconDesign.js";

// Styles
import iconCss from "./generated/themes/Icon.css.js";

/**
 * Interface for components that represent an icon, usable in numerous higher-order components
 * @public
 */
interface IIcon extends HTMLElement { }

const ICON_NOT_FOUND = "ICON_NOT_FOUND";
const PRESENTATION_ROLE = "presentation";

/**
 * @class
 * ### Overview
 *
 * The `ui5-icon` component represents an SVG icon.
 * There are two main scenarios how the `ui5-icon` component is used:
 * as a purely decorative element,
 * or as an interactive element that can be focused and clicked.
 *
 * ### Usage
 *
 * 1. **Get familiar with the icons collections.**
 *
 * Before displaying an icon, you need to explore the icons collections to find and import the desired icon.
 *
 * Currently there are 3 icons collection, available as 3 npm packages:
 *
 * - [@ui5/webcomponents-icons](https://www.npmjs.com/package/@ui5/webcomponents-icons) represents the "SAP-icons" collection and includes the following
 * [icons](https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html#/overview/SAP-icons).
 * - [@ui5/webcomponents-icons-tnt](https://www.npmjs.com/package/@ui5/webcomponents-icons-tnt) represents the "tnt" collection and includes the following
 * [icons](https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html#/overview/SAP-icons-TNT).
 * - [@ui5/webcomponents-icons-icons-business-suite](https://www.npmjs.com/package/@ui5/webcomponents-icons-business-suite) represents the "business-suite" collection and includes the following
 * [icons](https://ui5.sap.com/test-resources/sap/m/demokit/iconExplorer/webapp/index.html#/overview/BusinessSuiteInAppSymbols).
 *
 * 2. **After exploring the icons collections, add one or more of the packages as dependencies to your project.**
 *
 * `npm i @ui5/webcomponents-icons`
 * `npm i @ui5/webcomponents-icons-tnt`
 * `npm i @ui5/webcomponents-icons-business-suite`
 *
 * 3. **Then, import the desired icon**.
 *
 * `import "@ui5/\{package_name\}/dist/\{icon_name\}.js";`
 *
 * **For Example**:
 *
 * For the standard "SAP-icons" icon collection, import an icon from the `@ui5/webcomponents-icons` package:
 *
 * `import "@ui5/webcomponents-icons/dist/employee.js";`
 *
 * For the "tnt" (SAP Fiori Tools) icon collection, import an icon from the `@ui5/webcomponents-icons-tnt` package:
 *
 * `import "@ui5/webcomponents-icons-tnt/dist/antenna.js";`
 *
 * For the "business-suite" (SAP Business Suite) icon collection, import an icon from the `@ui5/webcomponents-icons-business-suite` package:
 *
 * `import "@ui5/webcomponents-icons-business-suite/dist/ab-testing.js";`
 *
 * 4. **Display the icon using the `ui5-icon` web component.**
 * Set the icon collection ("SAP-icons", "tnt" or "business-suite" - "SAP-icons" is the default icon collection and can be skipped)
 * and the icon name to the `name` property.
 *
 * `<ui5-icon name="employee"></ui5-icon>`
 * `<ui5-icon name="tnt/antenna"></ui5-icon>`
 * `<ui5-icon name="business-suite/ab-testing"></ui5-icon>`
 *
 * ### Keyboard Handling
 *
 * - [Space] / [Enter] or [Return] - Fires the `click` event if the `interactive` property is set to true.
 * - [Shift] - If [Space] / [Enter] or [Return] is pressed, pressing [Shift] releases the ui5-icon without triggering the click event.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/Icon.js";`
 * @csspart root - Used to style the outermost wrapper of the `ui5-icon`.
 * @constructor
 * @extends UI5Element
 * @implements {IIcon}
 * @public
 */
@customElement({
	tag: "ui5-icon",
	languageAware: true,
	themeAware: true,
	renderer: litRender,
	template: IconTemplate,
	styles: iconCss,
})
/**
 * Fired on mouseup, `SPACE` and `ENTER`.
 * - on mouse click, the icon fires native `click` event
 * - on `SPACE` and `ENTER`, the icon fires custom `click` event
 * @private
 * @since 1.0.0-rc.8
 */
@event("click")
class Icon extends UI5Element implements IIcon {
	/**
	 * Defines the component semantic design.
	 * @default "Default"
	 * @public
	 * @since 1.9.2
	 */
	@property({ type: IconDesign, defaultValue: IconDesign.Default })
	design!: `${IconDesign}`;

	/**
	 * Defines if the icon is interactive (focusable and pressable)
	 * @default false
	 * @public
	 * @since 1.0.0-rc.8
	 */
	@property({ type: Boolean })
	interactive!: boolean;

	/**
	 * Defines the unique identifier (icon name) of the component.
	 *
	 * To browse all available icons, see the
	 * [SAP Icons](https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html),
	 * [SAP Fiori Tools](https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html#/overview/SAP-icons-TNT) and
	 * [SAP Business Suite](https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html)
	 *
	 * Example:
	 * `name='add'`, `name='delete'`, `name='employee'`.
	 *
	 * **Note:** To use the SAP Fiori Tools icons,
	 * you need to set the `tnt` prefix in front of the icon's name.
	 *
	 * Example:
	 * `name='tnt/antenna'`, `name='tnt/actor'`, `name='tnt/api'`.
	 *
	 * **Note:** To use the SAP Business Suite icons,
	 * you need to set the `business-suite` prefix in front of the icon's name.
	 *
	 * Example:
	 * `name='business-suite/3d'`, `name='business-suite/1x2-grid-layout'`, `name='business-suite/4x4-grid-layout'`.
	 * @default ""
	 * @public
	 */
	@property()
	name!: string;

	/**
	 * Defines the text alternative of the component.
	 * If not provided a default text alternative will be set, if present.
	 *
	 * **Note:** Every icon should have a text alternative in order to
	 * calculate its accessible name.
	 * @default ""
	 * @public
	 */
	@property()
	accessibleName!: string;

	/**
	 * Defines whether the component should have a tooltip.
	 *
	 * **Note:** The tooltip text should be provided via the `accessible-name` property.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	showTooltip!: boolean;

	/**
	 * Defines the accessibility role of the component.
	 * @default ""
	 * @public
	 * @since 1.1.0
	 */
	@property()
	accessibleRole!: string;

	/**
	 * Defines the ARIA hidden state of the component.
	 * Note: If the role is presentation the default value of aria-hidden will be true.
	 * @private
	 * @since 1.0.0-rc.15
	 */
	@property()
	ariaHidden!: string;

	/**
	 * @private
	 */
	@property({ multiple: true })
	pathData!: Array<string>;

	/**
	 * @private
	 */
	@property({ type: Object, defaultValue: undefined, noAttribute: true })
	accData?: I18nText;

	/**
	 * @private
	 */
	@property({ type: Boolean })
	focused!: boolean;

	/**
	* @private
	*/
	@property({ type: Boolean })
	invalid!: boolean;

	/**
	 * @private
	 */
	@property({ noAttribute: true, defaultValue: undefined })
	effectiveAccessibleName?: string;

	ltr?: boolean;
	packageName?: string;
	viewBox?: string;
	customSvg?: object;

	_onfocusout?: ((event: FocusEvent) => void);
	_onfocusin?: ((event: FocusEvent) => void);

	_onFocusInHandler() {
		if (this.interactive) {
			this.focused = true;
		}
	}

	_onFocusOutHandler() {
		this.focused = false;
	}

	_onkeydown(e: KeyboardEvent) {
		if (!this.interactive) {
			return;
		}

		if (isEnter(e)) {
			this.fireEvent("click");
		}

		if (isSpace(e)) {
			e.preventDefault(); // prevent scrolling
		}
	}

	_onkeyup(e: KeyboardEvent) {
		if (this.interactive && isSpace(e)) {
			this.fireEvent("click");
		}
	}

	/**
	* Enforce "ltr" direction, based on the icons collection metadata.
	*/
	get _dir() {
		return this.ltr ? "ltr" : undefined;
	}

	get effectiveAriaHidden() {
		if (this.ariaHidden === "") {
			if (this.isDecorative) {
				return true;
			}

			return;
		}

		return this.ariaHidden;
	}

	get _tabIndex() {
		return this.interactive ? "0" : undefined;
	}

	get isDecorative() {
		return this.effectiveAccessibleRole === PRESENTATION_ROLE;
	}

	get effectiveAccessibleRole() {
		if (this.accessibleRole) {
			return this.accessibleRole;
		}

		if (this.interactive) {
			return "button";
		}

		return this.effectiveAccessibleName ? "img" : PRESENTATION_ROLE;
	}

	async onBeforeRendering() {
		const name = this.name;
		if (!name) {
			/* eslint-disable-next-line */
			return console.warn("Icon name property is required", this);
		}

		let iconData: typeof ICON_NOT_FOUND | IconData | undefined = getIconDataSync(name);
		if (!iconData) {
			iconData = await getIconData(name);
		}

		if (!iconData) {
			this.invalid = true;
			/* eslint-disable-next-line */
			return console.warn(`Required icon is not registered. Invalid icon name: ${this.name}`);
		}

		if (iconData === ICON_NOT_FOUND) {
			this.invalid = true;
			/* eslint-disable-next-line */
			return console.warn(`Required icon is not registered. You can either import the icon as a module in order to use it e.g. "@ui5/webcomponents-icons/dist/${name.replace("sap-icon://", "")}.js", or setup a JSON build step and import "@ui5/webcomponents-icons/dist/AllIcons.js".`);
		}

		this.viewBox = iconData.viewBox || "0 0 512 512";

		if (iconData.customTemplate) {
			iconData.pathData = [];
			this.customSvg = executeTemplate(iconData.customTemplate, this);
		}

		// in case a new valid name is set, show the icon
		this.invalid = false;
		this.pathData = Array.isArray(iconData.pathData) ? iconData.pathData : [iconData.pathData];
		this.accData = iconData.accData;
		this.ltr = iconData.ltr;
		this.packageName = iconData.packageName;

		this._onfocusout = this.interactive ? this._onFocusOutHandler.bind(this) : undefined;
		this._onfocusin = this.interactive ? this._onFocusInHandler.bind(this) : undefined;

		if (this.accessibleName) {
			this.effectiveAccessibleName = this.accessibleName;
		} else if (this.accData) {
			const i18nBundle = await getI18nBundle(this.packageName);
			this.effectiveAccessibleName = i18nBundle.getText(this.accData) || undefined;
		} else {
			this.effectiveAccessibleName = undefined;
		}
	}

	get hasIconTooltip() {
		return this.showTooltip && this.effectiveAccessibleName;
	}
}

Icon.define();

export default Icon;
export type {
	IIcon,
};
