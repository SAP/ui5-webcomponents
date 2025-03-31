import ResponsivePopover from "@ui5/webcomponents/dist/ResponsivePopover.js";
import type Search from "./Search.js";
import BusyIndicator from "@ui5/webcomponents/dist/BusyIndicator.js";
import List from "@ui5/webcomponents/dist/List.js";
import ListSeparator from "@ui5/webcomponents/dist/types/ListSeparator.js";
import PopoverHorizontalAlign from "@ui5/webcomponents/dist/types/PopoverHorizontalAlign.js";
import PopoverPlacement from "@ui5/webcomponents/dist/types/PopoverPlacement.js";
import { isPhone } from "@ui5/webcomponents-base";
import Input from "@ui5/webcomponents/dist/Input.js";
import SuggestionItem from "@ui5/webcomponents/dist/SuggestionItem.js";
import InputKeyHint from "@ui5/webcomponents/dist/types/InputKeyHint.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import ButtonDesign from "@ui5/webcomponents/dist/types/ButtonDesign.js";

export default function SearchPopoverTemplate(this: Search) {
	return (
		<ResponsivePopover
			hideArrow={true}
			preventFocusRestore={true}
			preventInitialFocus={!isPhone()}
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

			{isPhone() ? (
				<>
					<header slot="header" class="ui5-search-popover-searching-header">
						<Input class="ui5-search-popover-search-field" onInput={this._handleMobileInput} showClearIcon={this.showClearIcon} noTypeahead={this.noTypeahead} hint={InputKeyHint.Search} onKeyDown={this._onMobileInputKeydown}>
							{this._flattenItems.map(item => {
								return (<SuggestionItem text={item.headingText}></SuggestionItem>);
							})}
						</Input>
						<Button design={ButtonDesign.Transparent} onClick={this._handleCancel}>{this.cancelButtonText}</Button>
					</header>
				</>
			) : null }

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
						onItemClick={this._onItemClick}>
						<slot></slot>
					</List>
					: (
						<slot name="illustration"></slot>
					)
				}
			</main>

			{this.action.length ? (<slot name="action" slot="footer"></slot>) : null}
		</ResponsivePopover>
	);
}
