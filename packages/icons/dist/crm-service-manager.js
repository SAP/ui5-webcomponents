import { isThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import {pathData as pathDataV5, ltr, accData} from "./v5/crm-service-manager.js";
import {pathData as pathDataV4} from "./v4/crm-service-manager.js";

const pathData = isThemeFamily("sap_horizon") ? pathDataV5 : pathDataV4;

export default "crm-service-manager";
export { pathData, ltr, accData };