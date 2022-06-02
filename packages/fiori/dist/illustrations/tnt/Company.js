import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./tnt-Dialog-Company.js";
import sceneSvg from "./tnt-Scene-Company.js";
import spotSvg from "./tnt-Spot-Company.js";

const name = "Company";
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