import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "package-diagram";
const pathData = "M420 128L318 230h66v-13c0-14 12-25 26-25h77c14 0 25 11 25 25v77c0 14-11 26-25 26h-77c-14 0-26-12-26-26v-13h-66l102 102h67c14 0 25 12 25 26v77c0 14-11 26-25 26h-77c-14 0-26-12-26-26v-66l-79-79c-6 24-26 42-50 42H52c-28 0-52-25-52-57V160c0-32 24-58 52-58h113l33 29h57c23 0 43 17 49 40l80-80V25c0-14 12-25 26-25h77c14 0 25 11 25 25v77c0 14-11 26-25 26h-67zm15-77v26h26V51h-26zM256 326V188c0-4-2-6-2-7l-56 1c-13 0-25-5-34-13l-19-16H52c1 0-1 3-1 7v166c0 4 2 6 3 6h201c-1 0 1-2 1-6zm179-83v25h26v-25h-26zm26 217v-26h-26v26h26z";
const ltr = false;
const accData = null;
const collection = "tnt-v3";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v3/package-diagram";
export { pathData, ltr, accData };