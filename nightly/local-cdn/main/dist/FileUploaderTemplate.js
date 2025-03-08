import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@ui5/webcomponents-base/jsx-runtime";
import Input from "./Input.js";
import FileUploaderPopoverTemplate from "./FileUploaderPopoverTemplate.js";
export default function FileUploaderTemplate() {
    return (_jsxs(_Fragment, { children: [_jsxs("div", { class: "ui5-file-uploader-root", onMouseOver: this._onmouseover, onMouseOut: this._onmouseout, onFocusIn: this._onfocusin, onFocusOut: this._onfocusout, onKeyDown: this._onkeydown, onKeyUp: this._onkeyup, onClick: this._onclick, onDragOver: this._ondrag, onDrop: this._ondrop, children: [_jsxs("div", { class: "ui5-file-uploader-mask", children: [!this.hideInput &&
                                _jsx(Input, { value: this.value, valueState: this.valueState, placeholder: this.placeholder, disabled: this.disabled, tabindex: -1, class: "ui5-file-uploader-input" }), _jsx("slot", {})] }), _jsx("input", { type: "file", tabindex: -1, "aria-hidden": "true", multiple: this.multiple, accept: this.accept, title: this.titleText, disabled: this.disabled, onChange: this._onChange })] }), FileUploaderPopoverTemplate.call(this)] }));
}
//# sourceMappingURL=FileUploaderTemplate.js.map