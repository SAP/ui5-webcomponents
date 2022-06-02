import { isThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import {pathData as pathDataV5, ltr, accData} from "./v5/keyboard-and-mouse.js";
import {pathData as pathDataV4} from "./v4/keyboard-and-mouse.js";

const pathData = isThemeFamily("sap_horizon") ? pathDataV5 : pathDataV4;

export default "keyboard-and-mouse";
export { pathData, ltr, accData };