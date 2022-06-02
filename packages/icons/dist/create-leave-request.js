import { isThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import {pathData as pathDataV5, ltr, accData} from "./v5/create-leave-request.js";
import {pathData as pathDataV4} from "./v4/create-leave-request.js";

const pathData = isThemeFamily("sap_horizon") ? pathDataV5 : pathDataV4;

export default "create-leave-request";
export { pathData, ltr, accData };