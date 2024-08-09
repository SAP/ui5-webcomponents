import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/project-definition.js";
import { pathData as pathDatav2 } from "./v2/project-definition.js";

const pathData = isLegacyThemeFamily() ? pathDatav1 : pathDatav2;

export default "business-suite/project-definition";
export { pathData, ltr, accData };