import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav4, ltr, accData } from "./v4/hello-world.js";
import { pathData as pathDatav5 } from "./v5/hello-world.js";

const pathData = isLegacyThemeFamily() ? pathDatav4 : pathDatav5;

export default "hello-world";
export { pathData, ltr, accData };