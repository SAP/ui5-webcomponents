import { isThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import {pathData as pathDataV5, ltr, accData} from "./v5/text-formatting.js";
import {pathData as pathDataV4} from "./v4/text-formatting.js";

const pathData = isThemeFamily("sap_horizon") ? pathDataV5 : pathDataV4;

export default "text-formatting";
export { pathData, ltr, accData };