import { getCustomElementsScopingSuffix } from "@ui5/webcomponents-base/dist/CustomElementsScope.js";
import { getLegacyCustomElementsScopingSuffix } from "../../../src/utils/LegacyCustomElementsScope.js";


const modifyTag = (tag: string) => {
	return [tag, getLegacyCustomElementsScopingSuffix(), getCustomElementsScopingSuffix()].filter(Boolean).join("-");
}

export { modifyTag }