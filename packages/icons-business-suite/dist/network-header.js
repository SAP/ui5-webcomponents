import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "network-header";
const pathData = "M35.5 254h171v-35h-151V-3h401v222h-151v35h171v226h-441V254zm51-65h339V29h-339v160zm307-96h-276V61h276v32zm0 64h-276v-32h276v32zm-155 62v35h35v-35h-35zm-172 230h379V286h-379v163zm347-32h-315V317h315v100z";
const ltr = false;
const accData = null;
const collection = "business-suite";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "network-header";
export { pathData, ltr, accData };