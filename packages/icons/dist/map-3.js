import { isThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import {pathData as pathDataV5, ltr, accData} from "./v5/map-3.js";
import {pathData as pathDataV4} from "./v4/map-3.js";

const pathData = isThemeFamily("sap_horizon") ? pathDataV5 : pathDataV4;

export default "map-3";
export { pathData, ltr, accData };