import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav4, ltr, accData } from "./v4/cargo-train.js";
import { pathData as pathDatav5 } from "./v5/cargo-train.js";

const pathData = isLegacyThemeFamily() ? pathDatav4 : pathDatav5;

export default "cargo-train";
export { pathData, ltr, accData };