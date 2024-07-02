import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./tnt-Dialog-UnSuccessfulAuth.js";
import sceneSvg from "./tnt-Scene-UnSuccessfulAuth.js";
import spotSvg from "./tnt-Spot-UnSuccessfulAuth.js";
import dotSvg from "./tnt-Dot-UnSuccessfulAuth.js";

const name = "UnSuccessfulAuth";
const set = "tnt";
const collection = "V5";

registerIllustration(name, {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
	set,
	collection,
});

export default "tnt/UnSuccessfulAuth";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};