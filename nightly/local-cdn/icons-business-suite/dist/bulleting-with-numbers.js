import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/bulleting-with-numbers.js";
import { pathData as pathDatav2 } from "./v2/bulleting-with-numbers.js";

const pathData = isLegacyThemeFamily() ? pathDatav1 : pathDatav2;

export default "business-suite/bulleting-with-numbers";
export { pathData, ltr, accData };