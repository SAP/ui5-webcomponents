import DataType from "./DataType.js";
/**
 * @class
 * Different types of ValueState.
 *
 * @extends sap.ui.webcomponents.base.types.DataType
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.base.types.ValueState
 * @public
 * @enum {string}
 */
class ValueState extends DataType {
/**
     *
     * @public
     * @type {None}
     */
 get None() { return "None" }
/**
     *
     * @public
     * @type {Success}
     */
 get Success() { return "Success" }
/**
     *
     * @public
     * @type {Warning}
     */
 get Warning() { return "Warning" }
/**
     *
     * @public
     * @type {Error}
     */
 get Error() { return "Error" }
/**
     *
     * @public
     * @type {Information}
     */
 get Information() { return "Information" }

    static isValid(value) {
        return !!ValueStates[value];
    }
}
/**
 * Different types of ValueStates.
 * @lends sap.ui.webcomponents.base.types.ValueState.prototype
 * @public
 */
var ValueStates;
(function (ValueStates) {
    /**
     *
     * @public
     * @type {None}
     */
    ValueStates["None"] = "None";
    /**
     *
     * @public
     * @type {Success}
     */
    ValueStates["Success"] = "Success";
    /**
     *
     * @public
     * @type {Warning}
     */
    ValueStates["Warning"] = "Warning";
    /**
     *
     * @public
     * @type {Error}
     */
    ValueStates["Error"] = "Error";
    /**
     *
     * @public
     * @type {Information}
     */
    ValueStates["Information"] = "Information";
})(ValueStates || (ValueStates = {}));
ValueState.generateTypeAccessors(ValueStates);
export default ValueState;
//# sourceMappingURL=ValueState.js.map