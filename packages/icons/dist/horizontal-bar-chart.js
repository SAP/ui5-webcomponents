import { isThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import {pathData as pathDataV5, ltr, accData} from "./v5/horizontal-bar-chart.js";
import {pathData as pathDataV4} from "./v4/horizontal-bar-chart.js";

const pathData = isThemeFamily("sap_horizon") ? pathDataV5 : pathDataV4;

export default "horizontal-bar-chart";
export { pathData, ltr, accData };