import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav4, ltr, accData } from "./v4/upload-to-cloud.js";
import { pathData as pathDatav5 } from "./v5/upload-to-cloud.js";

const pathData = isLegacyThemeFamily() ? pathDatav4 : pathDatav5;

export default "upload-to-cloud";
export { pathData, ltr, accData };