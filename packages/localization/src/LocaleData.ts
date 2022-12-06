import type LocaleDataOpenUI5T from "sap/ui/core/LocaleData";
// @ts-ignore
import LocaleDataNative from "./sap/ui/core/LocaleData.js";

const LocaleDataWrapped = LocaleDataNative as typeof LocaleDataOpenUI5T;
class LocaleData extends LocaleDataWrapped {}

export default LocaleData;
