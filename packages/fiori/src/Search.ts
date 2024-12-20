import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import ButtonDesign from "@ui5/webcomponents/dist/types/ButtonDesign.js";
import SearchPopupMode from "@ui5/webcomponents/dist/types/SearchPopupMode.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import Select from "@ui5/webcomponents/dist/Select.js";
import Option from "@ui5/webcomponents/dist/Option.js";
import Popover from "@ui5/webcomponents/dist/Popover.js";
import List from "@ui5/webcomponents/dist/List.js";
import BusyIndicator from "@ui5/webcomponents/dist/BusyIndicator.js";
import Title from "@ui5/webcomponents/dist/Title.js";
import Text from "@ui5/webcomponents/dist/Text.js";

import SearchTemplate from "./generated/templates/SearchTemplate.lit.js";
import SearchCss from "./generated/themes/Search.css.js";
import SearchField from "./SearchField.js";

/**
 * @class
 *
 * ### Overview
 *
 * A `ui5-search` is an input field, used for user search.
 *
 * The `ui5-search` consists of several elements parts:
 * - Scope - displays a select in the beggining of the component, used for filtering results by their scope.
 * - Input field - for user input value
 * - Clear button - gives the possibility for deleting the entered value
 * - Search button - a primary button for performing search, when the user has entered a search term
 * - Expand/Collapse button - when there is no search term, the search button behaves as an expand/collapse button for the `ui5-search` component
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/fiori/dist/Search.js";`
 *
 * @constructor
 * @extends UI5Element
 * @public
 * @since 2.0.0
 * @experimental This component is availabe since 2.0 under an experimental flag and its API and behaviour are subject to change.
 */
@customElement({
	tag: "ui5-search",
	languageAware: true,
	renderer: litRender,
	template: SearchTemplate,
	styles: [
		SearchField.styles,
		SearchCss,
	],
	dependencies: [
		Button,
		Icon,
		Select,
		Option,
		Popover,
		List,
		BusyIndicator,
		Title,
		Text,
	],
})

/**
 * Fired when load more button is pressed.
 *
 * @public
 * @since 2.4.0
 */
@event("load-more")

class Search extends SearchField {
	eventDetails!: SearchField["eventDetails"] & {
		"load-more": void,
	}
	/**
	 * Defines the visualisation mode of the search component.
	 *
	 * @default "List"
	 * @public
	 */
	@property()
	popupMode: `${SearchPopupMode}` = "List";

	@property()
	headerText?: string;

	@property()
	subheaderText?: string;

	@property({ type: Boolean })
	showMore = false;

	@property()
	moreButtonText?: string;

	/**
	 * Indicates whether the items picker is open.
	 * @private
	 */
	@property({ type: Boolean, noAttribute: true })
	_open = false;

	/**
	 * Defines the Search suggestion items.
	 *
	 * @public
	 */
	@slot()
	items!: Array<HTMLElement>;

	/**
	 * Defines the illustrated message to be shown in the popup.
	 *
	 * @public
	 */
	@slot()
	illustration!: HTMLElement;

	onAfterRendering(): void {
		this.style.setProperty("--search_width", `${this.getBoundingClientRect().width}px`);
	}

	_onfocusin() {
		super._onfocusin();
		this._open = true;
	}

	_onfocusout() {
		super._onfocusout();

		if (!this.matches(":focus-within")) {
			this._open = false;
		}
	}

	_handleClose() {
		this._open = false;
	}

	_handleMore() {
		this.fireDecoratorEvent("load-more");
	}

	get _showIllustration() {
		return !!this.illustration && this.popupMode === SearchPopupMode.Illustration;
	}

	get _searchDesign() {
		return this.value.length && this.focusedInnerInput ? ButtonDesign.Emphasized : ButtonDesign.Transparent;
	}

	get _showLoading() {
		return this.popupMode === SearchPopupMode.Loading;
	}

	get _showHeader() {
		// can we show subheader only?
		return !!this.headerText;
	}

	get _effectiveGrowing() {
		return this.showMore ? "Button" : "None";
	}
}

Search.define();

export default Search;
