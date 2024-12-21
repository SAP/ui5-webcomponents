import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "gate";
const pathData = "M220 229v116h2c24 0 43 20 43 43v49c0 23-19 43-43 43H60c-23 0-43-20-43-43v-49c0-23 20-43 43-43h1V229c0-18 10-35 21-47-17-16-27-38-27-63 0-48 39-86 86-86h307c27 0 47 21 47 47v82c0 26-20 47-47 47H217c1 7 3 13 3 20zM140 75c-25 0-46 19-46 44s21 46 46 46 44-21 44-46-19-44-44-44zm172 90l87-88h-43l-88 88h44zm-20-88h-76c6 13 11 27 11 42 0 9-1 19-3 26zm158 85V90l-75 75h73c2 0 2-1 2-3zm-275 67c0-10-9-20-19-20h-31c-10 0-18 10-18 20v116h68V229zM63 434h157v-43H63v43z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/gate";
export { pathData, ltr, accData };