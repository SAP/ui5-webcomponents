import { isThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import {pathData as pathDataV5, ltr, accData} from "./v5/sap-ui5.js";
import {pathData as pathDataV4} from "./v4/sap-ui5.js";

const pathData = isThemeFamily("sap_horizon") ? pathDataV5 : pathDataV4;

export default "sap-ui5";
export { pathData, ltr, accData };