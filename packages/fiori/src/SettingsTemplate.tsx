import type Settings from "./Settings.js";
import Dialog from "@ui5/webcomponents/dist/Dialog.js";
import Title from "@ui5/webcomponents/dist/Title.js";
import Input from "@ui5/webcomponents/dist/Input.js";
import Text from "@ui5/webcomponents/dist/Text.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import List from "@ui5/webcomponents/dist/List.js";
import ListItemStandard from "@ui5/webcomponents/dist/ListItemStandard.js";
import ToolbarButton from "@ui5/webcomponents/dist/ToolbarButton.js";
import Toolbar from "@ui5/webcomponents/dist/Toolbar.js";
import search from "@ui5/webcomponents-icons/dist/search.js";
import type SettingItem from "./SettingItem.js";

export default function SettingsTemplate(this: Settings) {
	return (

		<Dialog class="ui5-sd-dialog"
			open={this.open}
			stretch
			accessibleName={this.accessibleNameText}
			onui5-_collapse={this._handleCollapseClick}
			onOpen={this._handleDialogAfterOpen}
			onBeforeClose={this._handleDialogBeforeClose}
			onClose={this._handleDialogAfterClose}
		>
			<div class="ui5-sd-root">
				<div class="ui5-sd-side" aria-orientation="vertical" aria-roledescription={this.ariaRoleDescList}>
					<div class="ui5-sd-side-header">
						{this.headerTitle &&
							<Title level="H4" size="H4">{this.headerTitle}</Title>
						}
						{this.showSearchField &&
							<Input placeholder="Search" type="Search" class="ui5-sd-side-search"
								   onInput={this._handleInput}>
								<Icon id="searchFieldIcon" slot="icon" name={search} showTooltip></Icon>
							</Input>
						}
					</div>
					{this._showNoSearchResult ?
						<div class="ui5-sd-side-text">
							<Text>{this.noSearchResultsText}</Text>
						</div>
						:
						renderList.call(this, this._filteredItems, "ui5-sd-side-items")}

					{this._filteredFixedItems.length > 0 && renderList.call(this, this._filteredFixedItems, "ui5-sd-side-fixedItems")}
				</div>

				<div class="ui5-sd-content">
					<slot name={this._selectedItemSlotName}></slot>
				</div>
			</div>

			<Toolbar slot="footer" design="Transparent">
				<ToolbarButton text={this.closeButtonText} onClick={this._handleCloseButtonClick} />
			</Toolbar>
		</Dialog>
	);
}

function renderList(this: Settings, items: Array<SettingItem> = [], classes: string) {
	return <List accessibleRole="Menu" onItemClick={this._handleItemClick} class={classes} separators="None">
		{items.map(item => (
			<ListItemStandard icon={item._icon} tooltip={item._tooltip} ref={this.captureRef.bind(item)} selected={item.selected} disabled={item.disabled} accessibleName={item.ariaLabelledByText}>{item.text}</ListItemStandard>
		))}
	</List>;
}
