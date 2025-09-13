import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./tnt-Dialog-UnsuccessfulAuth.js";
import sceneSvg from "./tnt-Scene-UnsuccessfulAuth.js";
import spotSvg from "./tnt-Spot-UnsuccessfulAuth.js";
import dotSvg from "./tnt-Spot-UnsuccessfulAuth.js";

const name = "UnsuccessfulAuth";
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

export default "tnt/UnsuccessfulAuth";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};