import { isThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import {pathData as pathDataV5, ltr, accData} from "./v5/cargo-train.js";
import {pathData as pathDataV4} from "./v4/cargo-train.js";

const pathData = isThemeFamily("sap_horizon") ? pathDataV5 : pathDataV4;

export default "cargo-train";
export { pathData, ltr, accData };