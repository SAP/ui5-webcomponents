import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav4, ltr, accData } from "./v4/edit-outside.js";
import { pathData as pathDatav5 } from "./v5/edit-outside.js";

const pathData = isLegacyThemeFamily() ? pathDatav4 : pathDatav5;

export default "edit-outside";
export { pathData, ltr, accData };