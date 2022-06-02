import { isThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import {pathData as pathDataV5, ltr, accData} from "./v5/navigation-down-arrow.js";
import {pathData as pathDataV4} from "./v4/navigation-down-arrow.js";

const pathData = isThemeFamily("sap_horizon") ? pathDataV5 : pathDataV4;

export default "navigation-down-arrow";
export { pathData, ltr, accData };