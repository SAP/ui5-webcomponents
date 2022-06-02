import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "split-segmentation";
const pathData = "M0 512l60-196 52 52q47-38 70.5-93T208 160V0h96v160q2 60 25.5 115t70.5 93l52-52 60 196-196-60 56-56q-49-42-82.5-100T256 172q0 66-33.5 124T140 396l56 56z";
const ltr = false;
const accData = null;
const collection = "business-suite";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "split-segmentation";
export { pathData, ltr, accData };