import { isThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import {pathData as pathDataV5, ltr, accData} from "./v5/text-align-center.js";
import {pathData as pathDataV4} from "./v4/text-align-center.js";

const pathData = isThemeFamily("sap_horizon") ? pathDataV5 : pathDataV4;

export default "text-align-center";
export { pathData, ltr, accData };