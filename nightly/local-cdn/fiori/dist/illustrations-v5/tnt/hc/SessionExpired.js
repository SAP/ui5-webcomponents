import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./tnt-Dialog-SessionExpired.js";
import sceneSvg from "./tnt-Scene-SessionExpired.js";
import spotSvg from "./tnt-Spot-SessionExpired.js";
import dotSvg from "./tnt-Dot-SessionExpired.js";

const name = "SessionExpired";
const set = "tnt";
const collection = "V5/HC";

registerIllustration(name, {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
	set,
	collection,
});

export default "tnt/SessionExpired";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};