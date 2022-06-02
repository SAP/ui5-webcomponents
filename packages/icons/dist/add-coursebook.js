import { isThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import {pathData as pathDataV5, ltr, accData} from "./v5/add-coursebook.js";
import {pathData as pathDataV4} from "./v4/add-coursebook.js";

const pathData = isThemeFamily("sap_horizon") ? pathDataV5 : pathDataV4;

export default "add-coursebook";
export { pathData, ltr, accData };