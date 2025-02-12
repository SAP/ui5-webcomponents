import Button from "@ui5/webcomponents/dist/Button.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import Option from "@ui5/webcomponents/dist/Option.js";
import Select from "@ui5/webcomponents/dist/Select.js";
import type SearchField from "./SearchField.js";

export default function SearchFieldTemplate(this: SearchField) {
	return (
		this.expanded ? (
			<div class="ui5-search-field-root" role="search">
				<div class="ui5-search-field-content">
					{this.showScope &&
						<>
							<Select onChange={this._handleScopeChange} class="sapUiSizeCompact" accessibleName="Select scope">
								{this.scopeOptions.map((scopeOption) => {
									return <Option
										id={scopeOption._id}
										selected={scopeOption.selected}
										data-ui5-stable={scopeOption.stableDomRef}
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
						onKeyDown={this._onkeydown} />


					{this._effectiveShowClearIcon &&
						<Icon
							class="ui5-shell-search-field-icon"
							name="decline"
							showTooltip={true}
							accessibleName="Clear search"
							onClick={this._handleClear}
						></Icon>
					}

					<Icon
						class={{
							"ui5-shell-search-field-icon": true,
							"ui5-shell-search-field-search-icon": this._isSearchIcon,
						}}
						name="search"
						showTooltip={true}
						accessibleName="Search (Enter)"
						onClick={this._handleSearchIconPress}
						onFocusOut={this._handleSearchIconFocusOut}
					></Icon>
				</div>
			</div>
		) : (
			<Button
				class="ui5-shell-search-field-button"
				icon="search"
				design="Transparent"
				data-sap-focus-ref
				onClick={this._handleSearchIconPress}
				accessibleName="Open Search"
				accessibilityAttributes={this._searchButtonAccessibilityAttributes}
			></Button>
		)
	);
}
