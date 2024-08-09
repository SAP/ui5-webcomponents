import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav4, ltr, accData } from "./v4/download-from-cloud.js";
import { pathData as pathDatav5 } from "./v5/download-from-cloud.js";

const pathData = isLegacyThemeFamily() ? pathDatav4 : pathDatav5;

export default "download-from-cloud";
export { pathData, ltr, accData };