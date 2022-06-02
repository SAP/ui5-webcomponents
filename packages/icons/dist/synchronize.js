import { isThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import {pathData as pathDataV5, ltr, accData} from "./v5/synchronize.js";
import {pathData as pathDataV4} from "./v4/synchronize.js";

const pathData = isThemeFamily("sap_horizon") ? pathDataV5 : pathDataV4;

export default "synchronize";
export { pathData, ltr, accData };