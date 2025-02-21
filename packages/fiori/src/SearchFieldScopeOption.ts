import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { ISearchFieldScopeOption } from "./SearchField.js";

/**
 * @class
 * The `ui5-search-scope-option` represents the options for the scope in `ui5-search`.
 * @constructor
 * @extends UI5Element
 * @abstract
 * @implements {ISearchFieldScopeOption}
 * @public
 */
@customElement("ui5-search-field-scope-option")
class SearchFieldScopeOption extends UI5Element implements ISearchFieldScopeOption {
	/**
	 * Defines the text of the component.
	 * @default ""
	 * @public
	 */
	@property()
	text!: string

	/**
	 * Indicates whether the item is selected
	 * @protected
	 */
	@property({ type: Boolean })
	selected!: boolean;

	get stableDomRef() {
		return this.getAttribute("stable-dom-ref") || `${this._id}-stable-dom-ref`;
	}
}

SearchFieldScopeOption.define();

export default SearchFieldScopeOption;
