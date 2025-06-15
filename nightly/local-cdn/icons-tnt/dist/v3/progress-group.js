import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "progress-group";
const pathData = "M485 512H27c-15 0-27-12-27-27V26C0 11 12 0 27 0h458c15 0 27 11 27 26v459c0 15-12 27-27 27zM53 53v405h406V53H53zm266 326H111c-10 0-18-6-23-14-5-9-4-19 2-28l54-82-54-81c-6-8-7-18-2-28 5-8 13-14 23-14h208c20 0 38 10 49 27l54 82c7 9 7 20 0 29l-54 82c-11 17-29 27-49 27zM198 270l-37 55h158c3 0 3 0 5-2l45-68-45-67c-2-2-2-2-5-2H161l37 55c6 9 6 20 0 29z";
const ltr = false;
const accData = null;
const collection = "tnt-v3";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v3/progress-group";
export { pathData, ltr, accData };