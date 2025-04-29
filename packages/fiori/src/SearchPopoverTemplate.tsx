import ResponsivePopover from "@ui5/webcomponents/dist/ResponsivePopover.js";
import type Search from "./Search.js";
import BusyIndicator from "@ui5/webcomponents/dist/BusyIndicator.js";
import List from "@ui5/webcomponents/dist/List.js";
import ListSeparator from "@ui5/webcomponents/dist/types/ListSeparator.js";
import PopoverHorizontalAlign from "@ui5/webcomponents/dist/types/PopoverHorizontalAlign.js";
import PopoverPlacement from "@ui5/webcomponents/dist/types/PopoverPlacement.js";
import { isPhone } from "@ui5/webcomponents-base/dist/Device.js";
import Input from "@ui5/webcomponents/dist/Input.js";
import SuggestionItem from "@ui5/webcomponents/dist/SuggestionItem.js";
import InputKeyHint from "@ui5/webcomponents/dist/types/InputKeyHint.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import ButtonDesign from "@ui5/webcomponents/dist/types/ButtonDesign.js";
import ListAccessibleRole from "@ui5/webcomponents/dist/types/ListAccessibleRole.js";
import type { JsxTemplate } from "@ui5/webcomponents-base/dist/index.js";

export default function SearchPopoverTemplate(this: Search, headerTemplate?: JsxTemplate) {
	return (
		<ResponsivePopover
			hideArrow={true}
			preventFocusRestore={true}
			preventInitialFocus={!isPhone()}
			accessibleNameRef="suggestions-speech-output message-area-text message-area-description"
			placement={PopoverPlacement.Bottom}
			horizontalAlign={PopoverHorizontalAlign.Start}
			open={this.open}
			opener={this}
			onOpen={this._handleOpen}
			onClose={this._handleClose}
			onBeforeClose={this._handleBeforeClose}
			onBeforeOpen={this._handleBeforeOpen}
			class={{
				"ui5-search-popover": true,
				"ui5-search-popover-phone": isPhone(),
			}}
		>

			{isPhone() ? (headerTemplate ? headerTemplate.call(this) : (
				<>
					<header slot="header" class="ui5-search-popup-searching-header">
						<Input class="ui5-search-popover-search-field" onInput={this._handleMobileInput} showClearIcon={this.showClearIcon} noTypeahead={this.noTypeahead} hint={InputKeyHint.Search} onKeyDown={this._onMobileInputKeydown}>
							{this._flattenItems.map(item => {
								return (<SuggestionItem text={item.text}></SuggestionItem>);
							})}
						</Input>
						<Button design={ButtonDesign.Transparent} onClick={this._handleCancel}>{this.cancelButtonText}</Button>
					</header>
				</>
			)) : null }

			<main class="ui5-search-popover-content">
				<slot name="messageArea"></slot>
				<div class="search-popover-busy-wrapper">
					<BusyIndicator active={true}></BusyIndicator>
				</div>

				{this.items.length ?
					<List
						class="ui5-search-list"
						separators={ListSeparator.None}
						onKeyDown={this._onItemKeydown}
						accessibleRole={ListAccessibleRole.ListBox}
						onItemClick={this._onItemClick}>
						<slot></slot>
					</List>
					: (
						<slot name="illustration"></slot>
					)
				}

				<span class="ui5-hidden-text" id="suggestions-speech-output">{this.suggestionsText}</span>
				{this.messageArea[0]?.text ? (<span class="ui5-hidden-text" id="message-area-text">{this.messageArea[0].text}</span>) : null}
				{this.messageArea[0]?.description ? (<span class="ui5-hidden-text" id="message-area-description">{this.messageArea[0].description}</span>) : null}
			</main>

			{this.action.length ? (<slot onKeyDown={this._handleActionKeydown} name="action" slot="footer"></slot>) : null}
		</ResponsivePopover>
	);
}
