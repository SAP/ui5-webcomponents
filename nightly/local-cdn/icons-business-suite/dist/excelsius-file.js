import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/excelsius-file.js";
import { pathData as pathDatav2 } from "./v2/excelsius-file.js";

const pathData = isLegacyThemeFamily() ? pathDatav1 : pathDatav2;

export default "business-suite/excelsius-file";
export { pathData, ltr, accData };