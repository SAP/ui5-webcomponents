import { isThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import {pathData as pathDataV5, ltr, accData} from "./v5/create-session.js";
import {pathData as pathDataV4} from "./v4/create-session.js";

const pathData = isThemeFamily("sap_horizon") ? pathDataV5 : pathDataV4;

export default "create-session";
export { pathData, ltr, accData };