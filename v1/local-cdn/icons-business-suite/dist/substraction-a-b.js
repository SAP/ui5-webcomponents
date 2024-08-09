import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/substraction-a-b.js";
import { pathData as pathDatav2 } from "./v2/substraction-a-b.js";

const pathData = isLegacyThemeFamily() ? pathDatav1 : pathDatav2;

export default "business-suite/substraction-a-b";
export { pathData, ltr, accData };