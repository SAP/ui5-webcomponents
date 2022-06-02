import { isThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import {pathData as pathDataV5, ltr, accData} from "./v5/thing-type.js";
import {pathData as pathDataV4} from "./v4/thing-type.js";

const pathData = isThemeFamily("sap_horizon") ? pathDataV5 : pathDataV4;

export default "thing-type";
export { pathData, ltr, accData };