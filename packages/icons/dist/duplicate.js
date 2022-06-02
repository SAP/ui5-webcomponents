import { isThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import {pathData as pathDataV5, ltr, accData} from "./v5/duplicate.js";
import {pathData as pathDataV4} from "./v4/duplicate.js";

const pathData = isThemeFamily("sap_horizon") ? pathDataV5 : pathDataV4;

export default "duplicate";
export { pathData, ltr, accData };