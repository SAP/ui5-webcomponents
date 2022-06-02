import { isThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import {pathData as pathDataV5, ltr, accData} from "./v5/bo-strategy-management.js";
import {pathData as pathDataV4} from "./v4/bo-strategy-management.js";

const pathData = isThemeFamily("sap_horizon") ? pathDataV5 : pathDataV4;

export default "bo-strategy-management";
export { pathData, ltr, accData };