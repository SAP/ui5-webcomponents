import { isThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import {pathData as pathDataV5, ltr, accData} from "./v5/insurance-life.js";
import {pathData as pathDataV4} from "./v4/insurance-life.js";

const pathData = isThemeFamily("sap_horizon") ? pathDataV5 : pathDataV4;

export default "insurance-life";
export { pathData, ltr, accData };