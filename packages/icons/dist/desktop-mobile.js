import { isThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import {pathData as pathDataV5, ltr, accData} from "./v5/desktop-mobile.js";
import {pathData as pathDataV4} from "./v4/desktop-mobile.js";

const pathData = isThemeFamily("sap_horizon") ? pathDataV5 : pathDataV4;

export default "desktop-mobile";
export { pathData, ltr, accData };