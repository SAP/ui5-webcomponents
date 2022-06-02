import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./tnt-Dialog-SessionExpiring.js";
import sceneSvg from "./tnt-Scene-SessionExpiring.js";
import spotSvg from "./tnt-Spot-SessionExpiring.js";

const name = "SessionExpiring";
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