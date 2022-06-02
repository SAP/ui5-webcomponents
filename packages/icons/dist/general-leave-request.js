import { isThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import {pathData as pathDataV5, ltr, accData} from "./v5/general-leave-request.js";
import {pathData as pathDataV4} from "./v4/general-leave-request.js";

const pathData = isThemeFamily("sap_horizon") ? pathDataV5 : pathDataV4;

export default "general-leave-request";
export { pathData, ltr, accData };