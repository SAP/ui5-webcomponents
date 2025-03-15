import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "content-enricher";
const pathData = "M454 479H261c-32 0-58-31-58-68 0-14 12-26 26-26s26 12 26 26c0 10 4 16 6 16h193c1 0 6-6 6-16V161c0-10-5-16-7-17H261c-2 1-6 7-6 17 0 14-12 25-26 25s-26-11-26-25c0-37 26-68 58-68h193c32 0 58 31 58 68v250c0 37-26 68-58 68zM0 333v-97c0-21 13-31 33-31h95c10 0 18 2 23 8 7 6 10 14 10 23v97c0 9-3 17-10 23-5 6-13 8-23 8H33c-20 0-33-10-33-31zm307 23c-6 0-11-2-14-6-8-7-8-19 0-27l18-18H203c-10 0-19-8-19-20 0-10 9-18 19-18h109l-19-19c-8-7-8-20 0-28 7-7 19-7 27 0l52 52c7 8 7 20 0 27l-52 51c-4 4-9 6-13 6z";
const ltr = false;
const accData = null;
const collection = "tnt-v3";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v3/content-enricher";
export { pathData, ltr, accData };