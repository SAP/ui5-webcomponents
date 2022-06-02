import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./tnt-Dialog-Unlock.js";
import sceneSvg from "./tnt-Scene-Unlock.js";
import spotSvg from "./tnt-Spot-Unlock.js";

const name = "Unlock";
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