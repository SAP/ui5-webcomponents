import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_MOVE } from "../generated/i18n/i18n-defaults.js";

const name = "move";
const pathData = "M505 238q7 7 7 18t-7 18l-77 77q-7 7-18 7t-18.5-7-7.5-18 7-18l34-33H282v143l33-34q7-7 18-7t18 7.5 7 18.5-7 18l-77 77q-7 7-18 7t-18-7l-77-77q-7-7-7-18t7-18.5 18-7.5 18 7l33 34V282H87l34 33q7 7 7 18t-7.5 18-18.5 7-18-7L7 274q-7-9-7-18t7-18l77-77q7-7 18-7t18.5 7 7.5 18-7 18l-34 33h143V87l-33 34q-7 7-18 7t-18-7.5-7-18.5 7-18l77-77q7-7 18-7t18 7l77 77q7 7 7 18t-7 18.5-18 7.5-18-7l-33-34v143h143l-34-33q-7-7-7-18t7.5-18 18.5-7 18 7z";
const ltr = false;
const accData = ICON_MOVE;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, accData, collection, packageName });

export default "SAP-icons-v5/move";
export { pathData, ltr, accData };