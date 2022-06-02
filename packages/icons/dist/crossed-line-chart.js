import { isThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import {pathData as pathDataV5, ltr, accData} from "./v5/crossed-line-chart.js";
import {pathData as pathDataV4} from "./v4/crossed-line-chart.js";

const pathData = isThemeFamily("sap_horizon") ? pathDataV5 : pathDataV4;

export default "crossed-line-chart";
export { pathData, ltr, accData };