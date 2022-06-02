import { isThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import {pathData as pathDataV5, ltr, accData} from "./v5/broken-link.js";
import {pathData as pathDataV4} from "./v4/broken-link.js";

const pathData = isThemeFamily("sap_horizon") ? pathDataV5 : pathDataV4;

export default "broken-link";
export { pathData, ltr, accData };