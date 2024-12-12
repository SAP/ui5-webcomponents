import type SettingItem from "./SettingItem.js";
import BusyIndicator from "@ui5/webcomponents/dist/BusyIndicator.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import TabContainer from "@ui5/webcomponents/dist/TabContainer.js";
import Tab from "@ui5/webcomponents/dist/Tab.js";
import Title from "@ui5/webcomponents/dist/Title.js";

export default function SettingItemTemplate(this: SettingItem) {
    return (
        <div class="ui5-setting-item">
            <BusyIndicator
            active={this.loading}
            class="ui5-setting-item-busy">
        </BusyIndicator>

        <header class="ui5-setting-item-header-container">
            <div class="ui5-setting-item-header">
                <Button icon="nav-back" design="Transparent" onClick={this._handleCollapseClick} class="ui5-setting-item-collapse-btn"></Button>
            {!this._isPhone &&
                <>
                    {this.showBackNavigation &&(
                    <Button icon="nav-back" design="Transparent" onClick={this._handleBackNavigationClick}></Button>
                    )}
				</>
            }
                <Title level="H4" size="H4">{this.headerTitle}</Title>
            </div>
        </header>

            { this._shouldHaveTabs ?
                <TabContainer content-background-design="Transparent" class="ui5-setting-item-tabs">
                    { this.views.map(view =>
                    <Tab text={view.text}>
                        <slot name={view._individualSlot} />
                    </Tab>
                    )}
                </TabContainer>
                    :
                    <>
                    { this.views.map(view =>
                        <div class="ui5-setting-item-view-container">
                            <slot name={view._individualSlot} />
                        </div>
                        )}
                    </>
                }
        </div>
    );
}
