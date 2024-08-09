import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav4, ltr, accData } from "./v4/thing-type.js";
import { pathData as pathDatav5 } from "./v5/thing-type.js";

const pathData = isLegacyThemeFamily() ? pathDatav4 : pathDatav5;

export default "thing-type";
export { pathData, ltr, accData };