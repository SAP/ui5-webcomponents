import { isThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import {pathData as pathDataV5, ltr, accData} from "./v5/person-placeholder.js";
import {pathData as pathDataV4} from "./v4/person-placeholder.js";

const pathData = isThemeFamily("sap_horizon") ? pathDataV5 : pathDataV4;

export default "person-placeholder";
export { pathData, ltr, accData };