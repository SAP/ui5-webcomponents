import Button from "@ui5/webcomponents/dist/Button.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import Option from "@ui5/webcomponents/dist/Option.js";
import Select from "@ui5/webcomponents/dist/Select.js";
import type SearchField from "./SearchField.js";
import decline from "@ui5/webcomponents-icons/dist/decline.js";
import search from "@ui5/webcomponents-icons/dist/search.js";
import ButtonDesign from "@ui5/webcomponents/dist/types/ButtonDesign.js";
import type SearchScope from "./SearchScope.js";

export type SearchFieldTemplateOptions = {
	/**
	 * If set to true, the search field will be expanded.
	 */
	forceExpanded?: boolean;
};

export default function SearchFieldTemplate(this: SearchField, options?: SearchFieldTemplateOptions) {
	return (
		!options?.forceExpanded && this.collapsed ? (
			<Button
				class="ui5-shell-search-field-button"
				icon={search}
				design={ButtonDesign.Transparent}
				data-sap-focus-ref
				onClick={this._handleSearchIconPress}
				tooltip={this._effectiveIconTooltip}
				accessibleName={this._effectiveIconTooltip}
				accessibilityAttributes={this._searchButtonAccessibilityAttributes}
			></Button>
		) : (
			<div class="ui5-search-field-root" role="search" onFocusOut={this._onFocusOutSearch}>
				<div class="ui5-search-field-content">
					{!!this.getSlottedNodes<SearchScope>("scopes").length &&
						<>
							<Select
								onChange={this._handleScopeChange}
								class="sapUiSizeCompact ui5-search-field-select"
								accessibleName={this._translations.scope}
								tooltip={this._translations.scope}>
								{this.getSlottedNodes<SearchScope>("scopes").map(scopeOption => {
									return <Option
										selected={scopeOption.selected}
										data-ui5-stable={scopeOption.stableDomRef}
										ref={this.captureRef.bind(scopeOption)}
									>{scopeOption.text}</Option>;
								},
								this)}
							</Select>
							<div class="ui5-search-field-separator"></div>
						</>
					}

					<input
						class="ui5-search-field-inner-input"
						role="searchbox"
						aria-label={this.accessibleName}
						value={this.value}
						placeholder={this.placeholder}
						data-sap-focus-ref
						onInput={this._handleInput}
						onFocusIn={this._onfocusin}
						onFocusOut={this._onfocusout}
						onKeyDown={this._onkeydown}
						onClick={this._handleInnerClick} />

					{this._effectiveShowClearIcon &&
						<Icon
							class="ui5-shell-search-field-icon"
							name={decline}
							showTooltip={true}
							accessibleName={this._translations.clearIcon}
							onClick={this._handleClear}
						></Icon>
					}

					<Icon
						class={{
							"ui5-shell-search-field-icon": true,
							"ui5-shell-search-field-search-icon": this._isSearchIcon,
						}}
						name={search}
						showTooltip={true}
						accessibleName={this._effectiveIconTooltip}
						onClick={this._handleSearchIconPress}
					></Icon>
				</div>
			</div>
		)
	);
}
