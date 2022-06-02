import { isThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import {pathData as pathDataV5, ltr, accData} from "./v5/key-user-settings.js";
import {pathData as pathDataV4} from "./v4/key-user-settings.js";

const pathData = isThemeFamily("sap_horizon") ? pathDataV5 : pathDataV4;

export default "key-user-settings";
export { pathData, ltr, accData };