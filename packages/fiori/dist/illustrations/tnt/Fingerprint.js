import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./tnt-Dialog-Fingerprint.js";
import sceneSvg from "./tnt-Scene-Fingerprint.js";
import spotSvg from "./tnt-Spot-Fingerprint.js";

const name = "Fingerprint";
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