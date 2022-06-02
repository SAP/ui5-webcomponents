import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./tnt-Dialog-NoFlows.js";
import sceneSvg from "./tnt-Scene-NoFlows.js";
import spotSvg from "./tnt-Spot-NoFlows.js";

const name = "NoFlows";
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