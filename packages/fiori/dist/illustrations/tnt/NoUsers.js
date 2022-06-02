import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./tnt-Dialog-NoUsers.js";
import sceneSvg from "./tnt-Scene-NoUsers.js";
import spotSvg from "./tnt-Spot-NoUsers.js";

const name = "NoUsers";
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