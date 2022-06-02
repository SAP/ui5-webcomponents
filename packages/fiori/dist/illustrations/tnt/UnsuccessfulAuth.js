import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./tnt-Dialog-UnsuccessfulAuth.js";
import sceneSvg from "./tnt-Scene-UnsuccessfulAuth.js";
import spotSvg from "./tnt-Spot-UnsuccessfulAuth.js";

const name = "UnsuccessfulAuth";
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