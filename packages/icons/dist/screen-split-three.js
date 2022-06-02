import { isThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import {pathData as pathDataV5, ltr, accData} from "./v5/screen-split-three.js";
import {pathData as pathDataV4} from "./v4/screen-split-three.js";

const pathData = isThemeFamily("sap_horizon") ? pathDataV5 : pathDataV4;

export default "screen-split-three";
export { pathData, ltr, accData };