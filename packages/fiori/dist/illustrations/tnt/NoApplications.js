import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./tnt-Dialog-NoApplications.js";
import sceneSvg from "./tnt-Scene-NoApplications.js";
import spotSvg from "./tnt-Spot-NoApplications.js";

const name = "NoApplications";
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