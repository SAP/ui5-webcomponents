import { isThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import {pathData as pathDataV5, ltr, accData} from "./v5/business-objects-experience.js";
import {pathData as pathDataV4} from "./v4/business-objects-experience.js";

const pathData = isThemeFamily("sap_horizon") ? pathDataV5 : pathDataV4;

export default "business-objects-experience";
export { pathData, ltr, accData };