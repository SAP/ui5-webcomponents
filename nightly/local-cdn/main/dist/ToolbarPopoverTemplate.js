import { jsx as _jsx } from "@ui5/webcomponents-base/jsx-runtime";
import Popover from "./Popover.js";
export default function ToolbarPopoverTemplate() {
    return (_jsx(Popover, { class: "ui5-overflow-popover", placement: "Bottom", horizontalAlign: "End", onClose: this.onOverflowPopoverClosed, onOpen: this.onOverflowPopoverOpened, accessibleName: this.accInfo.popover.accessibleName, hideArrow: true, children: _jsx("div", { class: {
                "ui5-overflow-list": true,
                "ui5-overflow-list--alignleft": this.hasItemWithText,
            }, children: this.overflowItems.map(item => (item.toolbarPopoverTemplate.call(item.context))) }) }));
}
//# sourceMappingURL=ToolbarPopoverTemplate.js.map