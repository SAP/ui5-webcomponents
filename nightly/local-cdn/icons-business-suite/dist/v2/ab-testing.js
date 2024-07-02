import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "ab-testing";
const pathData = "M1 327V148c0-42 35-76 77-76h280c42 0 77 34 77 76v179c0 42-35 76-77 76H78c-42 0-77-34-77-76zm66-201l147 113c4 3 8 3 12 0l144-113c-4-2-8-3-12-3H78c-4 0-8 1-11 3zm444 48v229c0 42-34 77-76 77H103c-14 0-26-12-26-26s12-25 26-25h332c14 0 25-12 25-26V174c0-14 12-25 26-25s25 11 25 25zM358 352c14 0 25-11 25-25V180l-126 99c-11 9-24 13-37 13s-27-4-38-13L52 179v148c0 14 12 25 26 25h280z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/ab-testing";
export { pathData, ltr, accData };