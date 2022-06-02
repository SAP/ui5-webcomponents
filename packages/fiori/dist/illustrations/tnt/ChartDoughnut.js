import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./tnt-Dialog-ChartDoughnut.js";
import sceneSvg from "./tnt-Scene-ChartDoughnut.js";
import spotSvg from "./tnt-Spot-ChartDoughnut.js";

const name = "ChartDoughnut";
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