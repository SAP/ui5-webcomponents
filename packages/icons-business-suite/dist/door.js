import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "door";
const pathData = "M336 33H176V1h160v32zm111 32v447H65V65h382zm-31 31H97v383h319V96zm-65 240q-31 0-31-32t31-32q33 0 33 32t-33 32z";
const ltr = false;
const accData = null;
const collection = "business-suite";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "door";
export { pathData, ltr, accData };