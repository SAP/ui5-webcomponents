import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "robot";
const pathData = "M256 54c126 0 229 103 229 230 0 125-103 228-229 228S27 409 27 284C27 157 130 54 256 54c-15 0-27-11-27-26 0-16 12-28 27-28s27 12 27 28c0 15-12 26-27 26zm0 432c112 0 202-91 202-202 0-112-90-203-202-203S54 172 54 284c0 111 90 202 202 202zm-56-311h108c60 0 108 49 108 109 0 59-48 107-108 107H200c-59 0-108-48-108-107 0-60 49-109 108-109zm0 189h108c44 0 80-36 80-80 0-45-36-82-80-82H200c-44 0-81 37-81 82 0 44 37 80 81 80zm2-108c15 0 27 12 27 28 0 15-12 26-27 26s-27-11-27-26c0-16 12-28 27-28zm108 0c15 0 27 12 27 28 0 15-12 26-27 26s-27-11-27-26c0-16 12-28 27-28z";
const ltr = false;
const accData = null;
const collection = "tnt-v3";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v3/robot";
export { pathData, ltr, accData };