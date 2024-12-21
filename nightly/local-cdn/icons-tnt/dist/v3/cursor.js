import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "cursor";
const pathData = "M346 256l125 124c12 12 12 33 0 45l-46 45c-6 7-13 10-22 10s-17-3-23-10L256 346v61c0 23-18 41-41 41-15 0-28-8-35-21l-2-4c-21-53-40-103-59-150-33-81-68-173-86-220-1-2-1-4-1-6 0-5 5-15 16-15 2 0 4 0 5 1 47 16 140 52 220 84 47 18 97 37 149 58l2 1h1c17 9 23 26 23 38 0 3 0 7-1 10-5 19-21 32-40 32h-61zm57 192l45-45-179-179h138c4 0 7-3 9-8v-3c0-4-2-7-5-8-5 0-223-90-336-130 44 111 132 332 132 336h1c1 3 4 5 7 5 6 0 9-3 9-9V269z";
const ltr = false;
const accData = null;
const collection = "tnt-v3";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v3/cursor";
export { pathData, ltr, accData };