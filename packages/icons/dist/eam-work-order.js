import { isThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import {pathData as pathDataV5, ltr, accData} from "./v5/eam-work-order.js";
import {pathData as pathDataV4} from "./v4/eam-work-order.js";

const pathData = isThemeFamily("sap_horizon") ? pathDataV5 : pathDataV4;

export default "eam-work-order";
export { pathData, ltr, accData };