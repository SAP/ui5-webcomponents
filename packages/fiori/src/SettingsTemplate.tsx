import type Settings from "./Settings.js";
import Dialog from "@ui5/webcomponents/dist/Dialog.js";
import Title from "@ui5/webcomponents/dist/Title.js";
import Input from "@ui5/webcomponents/dist/Input.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import List from "@ui5/webcomponents/dist/List.js";
import ListItemStandard from "@ui5/webcomponents/dist/ListItemStandard.js";
import ToolbarButton from "@ui5/webcomponents/dist/ToolbarButton.js";
import Toolbar from "@ui5/webcomponents/dist/Toolbar.js";
import search from "@ui5/webcomponents-icons/dist/search.js";

export default function SettingsTemplate(this: Settings) {
    return (

        <Dialog class="ui5-sd-dialog" open={this.open} onui5-collapse={this._handleCollapseClick} accessibleName={this.accessibleNameText}>
            <div class="ui5-sd-root">
                <div class="ui5-sd-side" aria-orientation="vertical" aria-roledescription="{{ariaRoleDescList}}">
                    <div class="ui5-sd-side-header">
                        {this.headerTitle &&
                             <Title level="H4" size="H4">{this.headerTitle}</Title>
                        }
                        {this.showSearchField &&
                            <Input placeholder="Search" type="Search" class="ui5-sd-side-search" onInput={this._handleInput}>
                                <Icon id="searchFieldIcon" slot="icon" name={search}></Icon>
                            </Input>
                        }
                    </div>

                    <List accessibleRole="Menu" onItemClick={this.setSelectedItem} class="ui5-sd-side-items">
                        <>
                        {this._normalItems.map(normalItem => (
                            <ListItemStandard icon={normalItem._icon} tooltip={normalItem._tooltip} ref={this.captureRef.bind(normalItem)} selected={normalItem.selected} disabled={normalItem.disabled} accessibleName={normalItem.ariaLabelledByText}>{normalItem.text}</ListItemStandard>
                         ))}
                        </>
                    </List>

                        {this._fixedItems.length > 0 &&
							<List accessibleRole="Menu" onItemClick={this.setSelectedItem} class="ui5-sd-side-fixedItems">
                                 {this._fixedItems.map(fixedItem =>(
                                    <ListItemStandard icon={fixedItem._icon} tooltip={fixedItem._tooltip} ref={this.captureRef.bind(fixedItem)} selected={fixedItem.selected} disabled={fixedItem.disabled} accessibleName={fixedItem.ariaLabelledByText}>{fixedItem.text}</ListItemStandard>
                                ))}
                            </List>
                        }
                </div>

                <div class="ui5-sd-content">
                        <slot name={this._selectedItemSlotName}></slot>
                    </div>
                </div>

                <Toolbar slot="footer">
                    <ToolbarButton design="Transparent" text="Close" onClick={this._onClose} />
                </Toolbar>
            </Dialog>
    );
}
