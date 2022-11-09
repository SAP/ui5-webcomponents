import DataType from "./DataType.js";
/**
 * Different calendar types.
 * @lends sap.ui.webcomponents.base.types.CalendarType.prototype
 * @public
 */
var CalendarTypes;
(function (CalendarTypes) {
    /**
     * @public
     * @type {Gregorian}
     */
    CalendarTypes["Gregorian"] = "Gregorian";
    /**
     * @public
     * @type {Islamic}
     */
    CalendarTypes["Islamic"] = "Islamic";
    /**
     * @public
     * @type {Japanese}
     */
    CalendarTypes["Japanese"] = "Japanese";
    /**
     * @public
     * @type {Buddhist}
     */
    CalendarTypes["Buddhist"] = "Buddhist";
    /**
     * @public
     * @type {Persian}
     */
    CalendarTypes["Persian"] = "Persian";
})(CalendarTypes || (CalendarTypes = {}));
/**
 * @class
 * Different calendar types.
 *
 * @extends sap.ui.webcomponents.base.types.DataType
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.base.types.CalendarType
 * @public
 * @enum {string}
 */
class CalendarType extends DataType {
/**
     * @public
     * @type {Gregorian}
     */
 get Gregorian() { return "Gregorian" }
/**
     * @public
     * @type {Islamic}
     */
 get Islamic() { return "Islamic" }
/**
     * @public
     * @type {Japanese}
     */
 get Japanese() { return "Japanese" }
/**
     * @public
     * @type {Buddhist}
     */
 get Buddhist() { return "Buddhist" }
/**
     * @public
     * @type {Persian}
     */
 get Persian() { return "Persian" }

    static isValid(value) {
        return !!CalendarTypes[value];
    }
}
CalendarType.generateTypeAccessors(CalendarTypes);
export default CalendarType;
export { CalendarTypes };
//# sourceMappingURL=CalendarType.js.map