import { isThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import {pathData as pathDataV5, ltr, accData} from "./v5/status-critical.js";
import {pathData as pathDataV4} from "./v4/status-critical.js";

const pathData = isThemeFamily("sap_horizon") ? pathDataV5 : pathDataV4;

export default "status-critical";
export { pathData, ltr, accData };