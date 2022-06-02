import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./tnt-Dialog-Systems.js";
import sceneSvg from "./tnt-Scene-Systems.js";
import spotSvg from "./tnt-Spot-Systems.js";

const name = "Systems";
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