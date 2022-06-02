import { isThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import {pathData as pathDataV5, ltr, accData} from "./v5/line-chart-time-axis.js";
import {pathData as pathDataV4} from "./v4/line-chart-time-axis.js";

const pathData = isThemeFamily("sap_horizon") ? pathDataV5 : pathDataV4;

export default "line-chart-time-axis";
export { pathData, ltr, accData };