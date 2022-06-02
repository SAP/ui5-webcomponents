import { isThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import {pathData as pathDataV5, ltr, accData} from "./v5/to-be-reviewed.js";
import {pathData as pathDataV4} from "./v4/to-be-reviewed.js";

const pathData = isThemeFamily("sap_horizon") ? pathDataV5 : pathDataV4;

export default "to-be-reviewed";
export { pathData, ltr, accData };