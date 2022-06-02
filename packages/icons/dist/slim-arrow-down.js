import { isThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import {pathData as pathDataV5, ltr, accData} from "./v5/slim-arrow-down.js";
import {pathData as pathDataV4} from "./v4/slim-arrow-down.js";

const pathData = isThemeFamily("sap_horizon") ? pathDataV5 : pathDataV4;

export default "slim-arrow-down";
export { pathData, ltr, accData };