import clsx from "clsx"
import type Toolbar from "./Toolbar.js"
import toolbarPopoverTemplate from "./ToolbarPopoverTemplate.js";

export default function (this: Toolbar) {
    return (<>
        <div
            class={clsx({
                "ui5-tb-items": true,
                "ui5-tb-items-full-width": this.hasFlexibleSpacers,
            })}
            role={this.accInfo.root.role}
            aria-label={this.accInfo.root.accessibleName}
        >
            {this.standardItems.map(item => {
                return item.toolbarTemplate.call(item.context);
            })}

            <ui5-button
                aria-hidden={this.hideOverflowButton}
                icon="overflow"
                design="Transparent"
                class={clsx({
                    "ui5-tb-item": true,
                    "ui5-tb-overflow-btn": true,
                    "ui5-tb-overflow-btn-hidden": this.hideOverflowButton,
                })}
                tooltip={this.accInfo.overflowButton.tooltip}
                accessible-name={this.accInfo.overflowButton.accessibleName}
                accessibilityAttributes={this.accInfo.overflowButton.accessibilityAttributes}
            ></ui5-button>
        </div>

        {toolbarPopoverTemplate.call(this)}
    </>);
};
