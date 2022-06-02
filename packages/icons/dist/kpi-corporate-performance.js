import { isThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import {pathData as pathDataV5, ltr, accData} from "./v5/kpi-corporate-performance.js";
import {pathData as pathDataV4} from "./v4/kpi-corporate-performance.js";

const pathData = isThemeFamily("sap_horizon") ? pathDataV5 : pathDataV4;

export default "kpi-corporate-performance";
export { pathData, ltr, accData };