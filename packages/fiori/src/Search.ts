import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import ButtonDesign from "@ui5/webcomponents/dist/types/ButtonDesign.js";
import SearchTemplate from "./generated/templates/SearchTemplate.lit.js";
import SearchCss from "./generated/themes/Search.css.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import Select from "@ui5/webcomponents/dist/Select.js";
import Option from "@ui5/webcomponents/dist/Option.js";

import {
	isEnter,
} from "@ui5/webcomponents-base/dist/Keys.js";

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
		SearchCss,
	],
	dependencies: [
		Button,
		Icon,
		Select,
		Option,
	],
})

/**
 * Fired when typing in input or clear icon is pressed.
 *
 * @public
 */
@event("input", {
	bubbles: true,
})

/**
 * Fired when the user has triggered search with Enter key or Search Button press.
 * @public
 */
@event("search", {
	bubbles: true,
})

class Search extends UI5Element {
	/**
	 * Defines whether scope select should be shown.
	 *
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	showScope = false;

	/**
	 * Defines whether the clear icon of the search will be shown.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	showClearIcon = false;

	/**
	 * Defines whether the component is expanded.
	 *
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	expanded = false;

	/**
	 * Defines the value of the component.
	 *
	 * **Note:** The property is updated upon typing.
	 * @default ""
	 * @public
	 */
	@property()
	value = "";

	/**
	 * Defines a short hint intended to aid the user with data entry when the
	 * component has no value.
	 * @default undefined
	 * @public
	 */
	@property()
	placeholder?: string;

	/**
	 * Defines the component scope select.
	 *
	 * **Note:** In order to show the scope, one should set `showScope` to true.
	 * @public
	 */
	@slot()
	scope!: Array<HTMLElement>;

	/**
	 * @private
	 */
	@property({ type: Boolean })
	focusedInnerInput = false;

	/**
	 * @private
	 */
	@property({ type: Boolean })
	_effectiveShowClearIcon = false;

	onBeforeRendering() {
		this._effectiveShowClearIcon = (this.showClearIcon && !!this.value);
	}

	_onkeydown (e:KeyboardEvent) {
		if (isEnter(e)) {
			return this._handleEnter(e);
		}
	}

	_onfocusin(e: FocusEvent) {
		this.focusedInnerInput = true; 
	}

	_onfocusout(e: FocusEvent) {
		this.focusedInnerInput = false;
	}

	_handleEnter (e:KeyboardEvent) {
		this.fireDecoratorEvent("search");
	}

	_handleSearchIconPress() {
		if (this.value.length) {
			this.fireDecoratorEvent("search");
			return;
		}

		this.expanded = !this.expanded;

		setTimeout(() => {
			this.focus();
		}, 0);
	}

	_handleInput(e: InputEvent) {
		this.value = (e.target as HTMLInputElement).value;

		this.fireDecoratorEvent("input");
	}

	_handleClear() {
		this.value = "";
		this.fireDecoratorEvent("input");

		this.focus();
	}

	get _searchDesign() {
		return this.value.length && this.focusedInnerInput ? ButtonDesign.Emphasized : ButtonDesign.Transparent;
	}
}

Search.define();

export default Search;
