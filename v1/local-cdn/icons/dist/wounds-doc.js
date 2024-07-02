import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav4, ltr, accData } from "./v4/wounds-doc.js";
import { pathData as pathDatav5 } from "./v5/wounds-doc.js";

const pathData = isLegacyThemeFamily() ? pathDatav4 : pathDatav5;

export default "wounds-doc";
export { pathData, ltr, accData };