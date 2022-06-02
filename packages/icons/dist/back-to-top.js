import { isThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import {pathData as pathDataV5, ltr, accData} from "./v5/back-to-top.js";
import {pathData as pathDataV4} from "./v4/back-to-top.js";

const pathData = isThemeFamily("sap_horizon") ? pathDataV5 : pathDataV4;

export default "back-to-top";
export { pathData, ltr, accData };