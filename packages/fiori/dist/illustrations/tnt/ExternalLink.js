import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./tnt-Dialog-ExternalLink.js";
import sceneSvg from "./tnt-Scene-ExternalLink.js";
import spotSvg from "./tnt-Spot-ExternalLink.js";

const name = "ExternalLink";
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