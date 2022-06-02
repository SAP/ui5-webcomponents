import { isThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import {pathData as pathDataV5, ltr, accData} from "./v5/navigation-up-arrow.js";
import {pathData as pathDataV4} from "./v4/navigation-up-arrow.js";

const pathData = isThemeFamily("sap_horizon") ? pathDataV5 : pathDataV4;

export default "navigation-up-arrow";
export { pathData, ltr, accData };