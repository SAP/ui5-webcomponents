import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./tnt-Dialog-SessionExpired.js";
import sceneSvg from "./tnt-Scene-SessionExpired.js";
import spotSvg from "./tnt-Spot-SessionExpired.js";

const name = "SessionExpired";
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