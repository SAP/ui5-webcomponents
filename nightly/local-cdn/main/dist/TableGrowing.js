var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var TableGrowing_1;
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { isSpace, isEnter, } from "@ui5/webcomponents-base/dist/Keys.js";
import TableGrowingMode from "./types/TableGrowingMode.js";
import TableGrowingTemplate from "./generated/templates/TableGrowingTemplate.lit.js";
import TableGrowingCss from "./generated/themes/TableGrowing.css.js";
import { TABLE_MORE, TABLE_MORE_DESCRIPTION, } from "./generated/i18n/i18n-defaults.js";
// The documentation should be similar to the Table.ts class documentation!
// Please only use that style where it uses markdown and the documentation is more readable.
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-table-growing` component is used inside the `ui5-table` to add a growing/data loading functionalities
 * to the table.
 *
 * The component offers two options:
 * * Button - a More button is displayed, clicking it will load more data.
 * * Scroll - additional data is loaded automatically when the user scrolls to the end of the table.
 *
 * ### Usage
 *
 * The `ui5-table-growing` component is only used inside the `ui5-table` component as a feature.
 * It has to be slotted inside the `ui5-table` in the `features` slot.
 * The component is not intended to be used as a standalone component.
 *
 * ```html
 * <ui5-table>
 * 	<ui5-table-growing type="Button" growing-text="More" slot="features"></ui5-table-growing>
 * </ui5-table>
 * ```
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/TableGrowing.js";`
 *
 * @constructor
 * @extends UI5Element
 * @since 2.0
 * @public
 * @experimental This web component is available since 2.0 with an experimental flag and its API and behavior are subject to change.
 */
let TableGrowing = TableGrowing_1 = class TableGrowing extends UI5Element {
    constructor() {
        super(...arguments);
        /**
         * Defines the mode of the <code>ui5-table</code> growing.
         *
         * Available options are:
         *
         * Button - Shows a More button at the bottom of the table, pressing it will load more rows.
         *
         * Scroll - The rows are loaded automatically by scrolling to the bottom of the table. If the table is not scrollable, this option is the same as the Button.
         * @default "Button"
         * @public
         */
        this.type = "Button";
        /**
         * Disables the growing feature.
         */
        this.disabled = false;
        /**
         * Defines the active state of the growing button.
         * Used for keyboard interaction.
         * @private
         */
        this._activeState = false;
    }
    static async onDefine() {
        TableGrowing_1.i18nBundle = await getI18nBundle("@ui5/webcomponents");
    }
    onTableActivate(table) {
        this._table = table;
        this._shouldFocusRow = false;
        if (this._hasScrollToLoad()) {
            this._observeTableEnd();
        }
    }
    onTableRendered() {
        // Focus the first row after growing, when the growing button is used
        if (this._shouldFocusRow) {
            this._shouldFocusRow = false;
            let focusRow = this._currentLastRow?.nextElementSibling;
            if (this.hasGrowingComponent()) {
                focusRow ||= this.getFocusDomRef();
            }
            focusRow ||= this._table?.rows[0];
            focusRow?.focus();
        }
        if (this.disabled) {
            return;
        }
        if (this._hasScrollToLoad()) {
            this._observeTableEnd();
        }
    }
    onExitDOM() {
        this._table = undefined;
        this._observer?.disconnect();
        this._observer = undefined;
        this._currentLastRow = undefined;
    }
    onBeforeRendering() {
        this._observer?.disconnect();
        this._observer = undefined;
        this._currentLastRow = undefined;
        this._invalidateTable();
    }
    hasGrowingComponent() {
        if (this._hasScrollToLoad()) {
            return !(this._table && this._table._scrollContainer.scrollHeight > this._table._scrollContainer.clientHeight) ?? true;
        }
        return this.type === TableGrowingMode.Button && !this.disabled;
    }
    /**
     * An event handler that can be used by the Table to notify the TableGrowing that
     * the Table is growing either by pressing the load more button or by scrolling to the end of the table.
     */
    loadMore() {
        // remembers the last row. only do this when the table has a growing component rendered.
        if (this._table && this.hasGrowingComponent()) {
            this._currentLastRow = this._table.rows[this._table.rows.length - 1];
        }
        this._shouldFocusRow = true;
        this.fireEvent("load-more");
    }
    _hasScrollToLoad() {
        return this.type === TableGrowingMode.Scroll;
    }
    /**
     * Observes the end of the table.
     * @private
     */
    _observeTableEnd() {
        if (!this._table) {
            return;
        }
        const lastElement = this._table.shadowRoot?.querySelector("#table-end-row");
        if (lastElement) {
            this._getIntersectionObserver().observe(lastElement);
        }
    }
    /**
     * Returns the IntersectionObserver instance. If it does not exist, it will be created.
     * The observer will call the loadMore function when the end of the table is reached.
     * @private
     */
    _getIntersectionObserver() {
        if (!this._observer) {
            this._observer = new IntersectionObserver(this._onIntersection.bind(this), {
                root: document,
                rootMargin: "10px",
                threshold: 1.0,
            });
        }
        return this._observer;
    }
    _onIntersection(entries) {
        if (entries.some(entry => entry.isIntersecting)) {
            this.loadMore();
        }
    }
    _invalidateTable() {
        if (!this._table) {
            return;
        }
        this._table._invalidate++;
    }
    /**
     * Handles the keydown event on the growing button.
     *
     * Calls the loadMore function when the Enter and Space keys are pressed.
     * @private
     */
    _onKeydown(e) {
        if (isSpace(e)) {
            e.preventDefault();
            this._activeState = true;
        }
        if (isEnter(e)) {
            this.loadMore();
            this._activeState = true;
        }
    }
    _onKeyup(e) {
        if (isSpace(e)) {
            this.loadMore();
        }
        this._activeState = false;
    }
    _onFocusout() {
        this._activeState = false;
    }
    get _growingButtonText() {
        return this.growingText || TableGrowing_1.i18nBundle.getText(TABLE_MORE);
    }
    get _growingButtonDescription() {
        return TableGrowing_1.i18nBundle.getText(TABLE_MORE_DESCRIPTION);
    }
    get _hasGrowingButton() {
        return this.hasGrowingComponent();
    }
};
__decorate([
    property()
], TableGrowing.prototype, "type", void 0);
__decorate([
    property()
], TableGrowing.prototype, "growingText", void 0);
__decorate([
    property()
], TableGrowing.prototype, "growingSubText", void 0);
__decorate([
    property({ type: Boolean })
], TableGrowing.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean })
], TableGrowing.prototype, "_activeState", void 0);
TableGrowing = TableGrowing_1 = __decorate([
    customElement({
        tag: "ui5-table-growing",
        renderer: litRender,
        template: TableGrowingTemplate,
        styles: TableGrowingCss,
    })
    /**
     * Fired when the growing button is pressed or the user scrolls to the end of the table.
     *
     * @public
     */
    ,
    event("load-more")
], TableGrowing);
TableGrowing.define();
export default TableGrowing;
//# sourceMappingURL=TableGrowing.js.map