import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_COLLAPSE } from "../generated/i18n/i18n-defaults.js";

const name = "collapse";
const pathData = "M150 124q-3 3-6 3-2 0-5-3L44 37q-5-5-11.5-5T21 37t-5 11.5T21 60l101 92q9 9 22 9t23-9l99-92q5-5 5-11t-5-11q-6-6-12-6-5 0-11 6zm314-92q13 0 22.5 9.5T496 64v384q0 14-9.5 23t-22.5 9H80q-14 0-23-9t-9-23V192h32v256h384V64H336V32h128zM144 240h256v32H144v-32z";
const ltr = false;
const accData = ICON_COLLAPSE;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, accData, collection, packageName });

export default "SAP-icons-v4/collapse";
export { pathData, ltr, accData };