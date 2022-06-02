import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./tnt-Dialog-ChartArea.js";
import sceneSvg from "./tnt-Scene-ChartArea.js";
import spotSvg from "./tnt-Spot-ChartArea.js";

const name = "ChartArea";
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