import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./tnt-Dialog-SuccessfulAuth.js";
import sceneSvg from "./tnt-Scene-SuccessfulAuth.js";
import spotSvg from "./tnt-Spot-SuccessfulAuth.js";
import dotSvg from "./tnt-Spot-SuccessfulAuth.js";

const name = "SuccessfulAuth";
const set = "tnt";
const collection = "V4";

registerIllustration(name, {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
	set,
	collection,
});

export default "tnt/SuccessfulAuth";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};