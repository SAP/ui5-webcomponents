import type ToolbarButton from "./ToolbarButton.js";
import Button from "./Button.js";

export default function (this: ToolbarButton ) {
    return (
        <Button
            class="ui5-tb-button ui5-tb-item"
            id={this.id}
            style={{
                width: this.width,
                display: this.hidden ? "none" : "inline-block",
            }}
            icon={this.icon}
            end-icon={this.endIcon}
            tooltip={this.tooltip}
            accessible-name={this.accessibleName}
            accessible-name-ref={this.accessibleNameRef}
            accessibilityAttributes={this.accessibilityAttributes}
            design={this.design}
            disabled={this.disabled}
            hidden={this.hidden}
            data-ui5-external-action-item-id={this._id}
            data-ui5-stable={this.stableDomRef}
            >
                {this.text}
        </Button>
    );
};
