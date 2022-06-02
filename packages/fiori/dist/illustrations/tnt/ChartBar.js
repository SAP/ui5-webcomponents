import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./tnt-Dialog-ChartBar.js";
import sceneSvg from "./tnt-Scene-ChartBar.js";
import spotSvg from "./tnt-Spot-ChartBar.js";

const name = "ChartBar";
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