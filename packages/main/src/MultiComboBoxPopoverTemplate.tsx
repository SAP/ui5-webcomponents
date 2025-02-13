import decline from "@ui5/webcomponents-icons/dist/decline.js";
import multiSelectAll from "@ui5/webcomponents-icons/dist/multiselect-all.js";
import type MultiComboBox from "./MultiComboBox.js";
import ResponsivePopover from "./ResponsivePopover.js";
import Button from "./Button.js";
import Input from "./Input.js";
import ToggleButton from "./ToggleButton.js";
import SuggestionItem from "./SuggestionItem.js";
import Icon from "./Icon.js";
import List from "./List.js";
import Popover from "./Popover.js";
import CheckBox from "./CheckBox.js";

export default function MultiComboBoxPopoverTemplate(this: MultiComboBox) {
	return (<>
		<ResponsivePopover
			placement="Bottom"
			horizontalAlign="Start"
			class={this.classes.popover}
			id={this.responsivePopoverId}
			hideArrow={true}
			preventInitialFocus={true}
			style={this.styles.suggestionsPopover}
			onui5-selection-change={this._listSelectionChange}
			onClose={this._afterClose}
			onBeforeOpen={this._beforeOpen}
			onBeforeClose={this._beforeClose}
			onOpen={this._afterOpen}
			onFocusOut={this._onPopoverFocusOut}
			accessibleName={this._popupLabel}
			open={this._open}
			opener={this}
		>
			{this._isPhone && <>
				<div slot="header" class="ui5-responsive-popover-header" style={this.styles.popoverHeader}>
					<div class="row">
						<span>{this._headerTitleText}</span>
						<Button
							class="ui5-responsive-popover-close-btn"
							icon={decline}
							design="Transparent"
							onClick={this.handleCancel}
						>
						</Button>
					</div>
					<div class="row">
						<Input
							onInput={this._handleMobileInput}
							onKeyDown={this._onMobileInputKeydown}
							placeholder={this.placeholder}
							valueState={this._dialogInputValueState}
							showClearIcon={this.showClearIcon}
							noTypeahead={this.noTypeahead}
						>
							{this._filteredItems.map(item => (
								<SuggestionItem text={item.text} additionalText={item.additionalText}></SuggestionItem>
							))}
						</Input>
						<ToggleButton
							slot="header"
							class="ui5-multi-combobox-toggle-button"
							icon={multiSelectAll}
							design="Transparent"
							pressed={this._showAllItemsButtonPressed}
							onClick={this.filterSelectedItems}
							accessibleName={this._showSelectedButtonAccessibleNameText}
						></ToggleButton>
					</div>
				</div>				{this.hasValueStateMessage &&
					<div class={this.classes.popoverValueState} style={this.styles.popoverValueStateMessage}>
						<Icon class="ui5-input-value-state-message-icon" name={this._valueStateMessageIcon}></Icon>
						{this.open && valueStateMessage.call(this)}
					</div>
				}

				{selectAllWrapper.call(this)}
			</>}

			{!this._isPhone && <>
				{this.hasValueStateMessage &&
					<div slot="header" onKeyDown={this._onListHeaderKeydown} tabIndex={0} class={this.classes.responsivePopoverHeaderValueState} style={this.styles.popoverValueStateMessage}>
						<Icon class="ui5-input-value-state-message-icon" name={this._valueStateMessageIcon}></Icon>
						{this.open && valueStateMessage.call(this)}
					</div>
				}

				{selectAllWrapper.call(this)}
			</>}

			{this.filterSelected ?
				<List separators="None" selectionMode="Multiple" class="ui5-multi-combobox-all-items-list" accessibleRole="ListBox">
					{this.selectedItems.map(item => <slot name={item._individualSlot}></slot>)}
				</List>
				:
				<List separators="None" selectionMode="Multiple" class="ui5-multi-combobox-all-items-list" accessibleRole="ListBox" onKeyDown={this._onItemKeydown}>
					{this._filteredItems.map(item => <slot name={item._individualSlot}></slot>)}
				</List>
			}

			{this._isPhone &&
				<div slot="footer" class="ui5-responsive-popover-footer">
					<Button
						design="Transparent"
						onClick={this.handleOK}
					>{this._dialogOkButton}</Button>
				</div>
			}
		</ResponsivePopover>

		{this.hasValueStateMessage &&
			<Popover
				// skipRegistryUpdate={true}
				preventInitialFocus={true}
				preventFocusRestore={true}
				hideArrow={true}
				class="ui5-valuestatemessage-popover"
				placement="Bottom"
				horizontalAlign={this._valueStatePopoverHorizontalAlign}
				tabIndex={-1}
				open={this.valueStateOpen}
				opener={this}
			>
				<div slot="header" class={this.classes.popoverValueState} style={this.styles.popoverHeader}>
					<Icon class="ui5-input-value-state-message-icon" name={this._valueStateMessageIcon}></Icon>
					{this.valueStateOpen && valueStateMessage.call(this)}
				</div>
			</Popover>
		}
	</>);
}

function valueStateMessage(this: MultiComboBox) {
	return this.shouldDisplayDefaultValueStateMessage ? this.valueStateDefaultText : <slot name="valueStateMessage"></slot>;
}

function selectAllWrapper(this: MultiComboBox) {
	if (this.showSelectAll) {
		return (
			<div class="ui5-mcb-select-all-header" onKeyDown={this._onListHeaderKeydown} tabIndex={0}>
				<CheckBox
					disabled={this.readonly}
					checked={this._allSelected}
					class="ui5-mcb-select-all-checkbox"
					text={this.selectAllCheckboxLabel}
					onChange={this._handleSelectAllCheckboxClick}
				></CheckBox>
			</div>
		);
	}
}
