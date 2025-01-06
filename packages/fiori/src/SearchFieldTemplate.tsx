import Button from "@ui5/webcomponents/dist/Button.js";
import Option from "@ui5/webcomponents/dist/Option.js";
import Select from "@ui5/webcomponents/dist/Select.js";
import type SearchField from "./SearchField.js";

export default function SearchFieldTemplate(this: SearchField) {
	return (
		this.expanded ? (
			<div class="ui5-search-field-root">
				<div class="ui5-search-field-content">
					{this.showScope &&
						<>
							<Select onChange={this._handleScopeChange} class="sapUiSizeCompact">
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
						value={this.value}
						placeholder={this.placeholder}
						data-sap-focus-ref
						onInput={this._handleInput}
						onFocusIn={this._onfocusin}
						onFocusOut={this._onfocusout}
						onKeyDown={this._onkeydown} />

					<Button
						class="ui5-shell-search-field-button ui5-shell-search-field-search-button"
						icon="search"
						design={this._searchDesign}
						onClick={this._handleSearchIconPress}
						onFocusOut={this._handleSearchIconFocusOut}
					></Button>

					{this._effectiveShowClearIcon &&
						<Button
							class="ui5-shell-search-field-button"
							icon="decline"
							design="Transparent"
							onClick={this._handleClear}
						></Button>
					}
				</div>
			</div>
		) : (
			<Button
				class="ui5-shell-search-field-button"
				icon="search"
				design="Transparent"
				data-sap-focus-ref
				onClick={this._handleSearchIconPress}
			></Button>
		)
	);
}
