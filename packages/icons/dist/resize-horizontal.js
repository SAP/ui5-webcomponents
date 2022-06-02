import { isThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import {pathData as pathDataV5, ltr, accData} from "./v5/resize-horizontal.js";
import {pathData as pathDataV4} from "./v4/resize-horizontal.js";

const pathData = isThemeFamily("sap_horizon") ? pathDataV5 : pathDataV4;

export default "resize-horizontal";
export { pathData, ltr, accData };