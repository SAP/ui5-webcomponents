import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./tnt-Dialog-FaceID.js";
import sceneSvg from "./tnt-Scene-FaceID.js";
import spotSvg from "./tnt-Spot-FaceID.js";

const name = "FaceID";
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