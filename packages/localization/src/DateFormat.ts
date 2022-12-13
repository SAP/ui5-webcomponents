import type DateFormatT from "sap/ui/core/format/DateFormat";
// @ts-ignore
import DateFormatNative from "./sap/ui/core/format/DateFormat.js";

const DateFormatWrapped = DateFormatNative as typeof DateFormatT;
class DateFormat extends DateFormatWrapped {}

export default DateFormat;
