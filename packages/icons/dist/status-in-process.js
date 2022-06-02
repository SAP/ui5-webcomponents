import { isThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import {pathData as pathDataV5, ltr, accData} from "./v5/status-in-process.js";
import {pathData as pathDataV4} from "./v4/status-in-process.js";

const pathData = isThemeFamily("sap_horizon") ? pathDataV5 : pathDataV4;

export default "status-in-process";
export { pathData, ltr, accData };