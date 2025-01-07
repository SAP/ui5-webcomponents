import Icon from "@ui5/webcomponents/dist/Icon.js";
import type SearchItem from "./SearchItem.js";
import Tag from "@ui5/webcomponents/dist/Tag.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import decline from "@ui5/webcomponents-icons/dist/decline.js";

export default function SearchFieldTemplate(this: SearchItem) {
	return (
		<li
			part="native-li"
			class="ui5-li-root ui5-li--focusable"
			data-sap-focus-ref
			draggable={this.movable}
			tabindex={this._effectiveTabIndex}
			onFocusIn={this._onfocusin}
			onFocusOut={this._onfocusout}
			onKeyUp={this._onkeyup}
			onKeyDown={this._onkeydown}
			onClick={this._onclick}
		>
			<div part="content" class="ui5-search-item-content">
				<div class="ui5-search-item-begin-content">
					{this._hasAvatar ?
						<slot name="avatar"></slot>
						: (
							this.icon &&
							<Icon class="ui5-search-item-icon" name={this.icon}></Icon>
						)
					}

					{this.scopeName &&
						<Tag design="Set2" colorScheme="10">
							{this.scopeName}
						</Tag>
					}

					<div class="ui5-search-item-titles-container">
						<span part="title" class="ui5-search-item-heading" dangerouslySetInnerHTML={{ __html: this._markupText }}></span>

						{this.subheadingText &&
							<div class="ui5-search-item-byline-container">
								<span part="subheading" class="ui5-search-item-subheading">{this.subheadingText}</span>

								{this.additionalText &&
									<span class="ui5-search-item-additionalText">{this.additionalText}</span>
								}
							</div>
						}
					</div>
					{this.selected &&
						<Button class="ui5-search-item-selected-delete" design="Transparent" icon={decline}></Button>
					}
				</div>
			</div>
		</li >
	);
}
