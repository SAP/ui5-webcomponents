import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav4, ltr, accData } from "./v4/idea-wall.js";
import { pathData as pathDatav5 } from "./v5/idea-wall.js";

const pathData = isLegacyThemeFamily() ? pathDatav4 : pathDatav5;

export default "idea-wall";
export { pathData, ltr, accData };