import { isThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import {pathData as pathDataV5, ltr, accData} from "./v5/check-availability.js";
import {pathData as pathDataV4} from "./v4/check-availability.js";

const pathData = isThemeFamily("sap_horizon") ? pathDataV5 : pathDataV4;

export default "check-availability";
export { pathData, ltr, accData };