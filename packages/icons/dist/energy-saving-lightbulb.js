import { isThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import {pathData as pathDataV5, ltr, accData} from "./v5/energy-saving-lightbulb.js";
import {pathData as pathDataV4} from "./v4/energy-saving-lightbulb.js";

const pathData = isThemeFamily("sap_horizon") ? pathDataV5 : pathDataV4;

export default "energy-saving-lightbulb";
export { pathData, ltr, accData };