import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./tnt-Dialog-Secrets.js";
import sceneSvg from "./tnt-Scene-Secrets.js";
import spotSvg from "./tnt-Spot-Secrets.js";

const name = "Secrets";
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