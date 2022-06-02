import { isThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import {pathData as pathDataV5, ltr, accData} from "./v5/write-new.js";
import {pathData as pathDataV4} from "./v4/write-new.js";

const pathData = isThemeFamily("sap_horizon") ? pathDataV5 : pathDataV4;

export default "write-new";
export { pathData, ltr, accData };