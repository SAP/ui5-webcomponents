import { isThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import {pathData as pathDataV5, ltr, accData} from "./v5/end-user-experience-monitoring.js";
import {pathData as pathDataV4} from "./v4/end-user-experience-monitoring.js";

const pathData = isThemeFamily("sap_horizon") ? pathDataV5 : pathDataV4;

export default "end-user-experience-monitoring";
export { pathData, ltr, accData };