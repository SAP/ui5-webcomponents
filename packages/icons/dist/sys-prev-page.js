import { isThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import {pathData as pathDataV5, ltr, accData} from "./v5/sys-prev-page.js";
import {pathData as pathDataV4} from "./v4/sys-prev-page.js";

const pathData = isThemeFamily("sap_horizon") ? pathDataV5 : pathDataV4;

export default "sys-prev-page";
export { pathData, ltr, accData };