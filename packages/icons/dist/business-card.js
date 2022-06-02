import { isThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import {pathData as pathDataV5, ltr, accData} from "./v5/business-card.js";
import {pathData as pathDataV4} from "./v4/business-card.js";

const pathData = isThemeFamily("sap_horizon") ? pathDataV5 : pathDataV4;

export default "business-card";
export { pathData, ltr, accData };