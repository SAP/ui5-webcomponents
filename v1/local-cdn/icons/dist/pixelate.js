import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav4, ltr, accData } from "./v4/pixelate.js";
import { pathData as pathDatav5 } from "./v5/pixelate.js";

const pathData = isLegacyThemeFamily() ? pathDatav4 : pathDatav5;

export default "pixelate";
export { pathData, ltr, accData };