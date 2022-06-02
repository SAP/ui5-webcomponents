import { isThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import {pathData as pathDataV5, ltr, accData} from "./v5/pull-down.js";
import {pathData as pathDataV4} from "./v4/pull-down.js";

const pathData = isThemeFamily("sap_horizon") ? pathDataV5 : pathDataV4;

export default "pull-down";
export { pathData, ltr, accData };