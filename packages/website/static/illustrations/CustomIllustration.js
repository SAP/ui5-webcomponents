import { registerIllustration, registerIllustrationLoader } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./customSet-Dialog-CustomIllustration.js";
import sceneSvg from "./customSet-Scene-CustomIllustration.js";
import spotSvg from "./customSet-Spot-CustomIllustration.js";
import dotSvg from "./customSet-Dot-CustomIllustration.js";

const name = "CustomIllustration";
const set = "customSet";
const collection = "V4";

export const loadIllustration = async (illustrationName) => {
	switch (illustrationName) {
		case "CustomIllustration": return (await import("./CustomIllustration.js")).default;
		case "customSet-Dot-CustomIllustration": return (await import("./customSet-Dot-CustomIllustration.js")).default;
		case "customSet-Spot-CustomIllustration": return (await import("./customSet-Spot-CustomIllustration.js")).default;
		case "customSet-Dialog-CustomIllustration": return (await import("./customSet-Dialog-CustomIllustration.js")).default;
		case "customSet-Scene-CustomIllustration": return (await import("./customSet-Scene-CustomIllustration.js")).default;
	}
}

const loadAndCheck = async (illustrationName) => {
	const data = await loadIllustration(illustrationName);
	return data;
};

["CustomIllustration",
"customSet-Dot-CustomIllustration",
"customSet-Spot-CustomIllustration",
"customSet-Dialog-CustomIllustration",
"customSet-Scene-CustomIllustration"].forEach((illustrationName) => registerIllustrationLoader(`customSet/V4/${illustrationName}`, loadAndCheck));

registerIllustration(name, {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
	set,
	collection,
});

export default "customSet/CustomIllustration";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};