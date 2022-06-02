import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./tnt-Dialog-UnableToLoad.js";
import sceneSvg from "./tnt-Scene-UnableToLoad.js";
import spotSvg from "./tnt-Spot-UnableToLoad.js";

const name = "UnableToLoad";
const set = "tnt";

registerIllustration(name, {
	dialogSvg,
	sceneSvg,
	spotSvg,
	set,
});

export {
	dialogSvg,
	sceneSvg,
	spotSvg,
};