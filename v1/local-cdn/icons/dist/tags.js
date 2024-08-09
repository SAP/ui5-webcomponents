import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav4, ltr, accData } from "./v4/tags.js";
import { pathData as pathDatav5 } from "./v5/tags.js";

const pathData = isLegacyThemeFamily() ? pathDatav4 : pathDatav5;

export default "tags";
export { pathData, ltr, accData };