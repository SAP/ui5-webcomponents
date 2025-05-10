import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "cursor";
const pathData = "M358.5 255l143 141c7 7 10 15 10 26 0 10-3 19-10 26l-53 51c-7 7-15 11-25 11s-18-3-26-11l-141-141v69c0 25-22 47-47 47-8 0-16-2-23-7-8-4-13-9-17-17l-2-5c-24-60-46-117-67-171-9-23-19-46-28-70-10-25-18-48-27-70s-17-43-25-62c-7-19-13-35-19-49-2-5-1-11 3-16s9-7 15-7c2 0 4 0 6 1 14 4 30 10 48 17 19 7 40 16 63 24 22 9 45 18 69 27 80 30 161 62 240 94l3 1c10 5 18 12 22 22 5 10 6 21 3 32-4 20-24 37-45 37h-70zm65 219l52-51-204-205h157c4 0 8-2 10-9 2-6 0-10-6-12-1 0-8-3-21-8-13-6-30-13-52-21-21-8-45-18-72-28s-54-20-83-31c-28-11-55-23-82-33-27-11-51-20-72-27 8 21 17 45 28 72s21 55 33 83c11 28 21 55 32 82 11 28 20 51 28 72 2 5 29 72 29 74h1c2 3 5 5 8 5 7 0 11-3 11-10V269z";
const ltr = false;
const accData = null;
const collection = "tnt-v3";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v3/cursor";
export { pathData, ltr, accData };