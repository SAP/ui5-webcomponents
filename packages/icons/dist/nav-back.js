import { isThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import {pathData as pathDataV5, ltr, accData} from "./v5/nav-back.js";
import {pathData as pathDataV4} from "./v4/nav-back.js";

const pathData = isThemeFamily("sap_horizon") ? pathDataV5 : pathDataV4;

export default "nav-back";
export { pathData, ltr, accData };