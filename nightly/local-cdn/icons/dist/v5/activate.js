import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_ACTIVATE } from "../generated/i18n/i18n-defaults.js";

const name = "activate";
const pathData = "M313 247q7 7 7 18t-7 18L102 494q-20 18-44 18-26 0-42-18T0 453q0-24 17-42l212-211q8-8 18-8 11 0 19 8zm103 233q-9 0-16-6t-9-15l-8-41-42-9q-9-2-15-9t-6-16 6-16 15-9l42-8 8-42q2-9 9-15t16-6 16 6 9 15l9 42 42 8q8 2 14 9t6 16-6 16-14 9l-42 9-9 41q-2 9-9 15t-16 6zM128 192q-9 0-16-6t-9-15l-8-41-42-9q-9-2-15-9t-6-16 6-16 15-9l42-8 8-42q2-9 9-15t16-6 16 6 9 15l9 42 42 8q8 2 14 9t6 16-6 16-14 9l-42 9-9 41q-2 9-9 15t-16 6zm288 0q-9 0-16-6t-9-15l-8-41-42-9q-9-2-15-9t-6-16 6-16 15-9l42-8 8-42q2-9 9-15t16-6 16 6 9 15l9 42 42 8q8 2 14 9t6 16-6 16-14 9l-42 9-9 41q-2 9-9 15t-16 6zm-181 96l-11-11L54 448q-3 1-3 5 0 8 8 8 3 0 5-2z";
const ltr = false;
const accData = ICON_ACTIVATE;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, accData, collection, packageName });

export default "SAP-icons-v5/activate";
export { pathData, ltr, accData };