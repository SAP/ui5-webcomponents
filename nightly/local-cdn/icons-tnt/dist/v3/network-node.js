import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "network-node";
const pathData = "M256 0c141 0 256 115 256 256S397 512 256 512C114 512 0 397 0 256S114 0 256 0zm0 480c124 0 224-100 224-224S380 32 256 32 32 132 32 256s100 224 224 224zm-16-368l-37 43c-3 3-7 5-12 5-8 0-16-8-17-16 0-5 2-8 6-11l52-60c6-6 14-9 23-9s16 3 23 9l54 61c3 3 4 6 4 10 0 8-9 16-18 16-3 0-7-2-10-5l-36-43v99c-6-2-12-3-17-3s-10 1-15 3v-99zm-24 247h1c8 0 15 8 15 16v2c-1 9-7 14-16 14l-80 5c-17-1-31-14-32-33l6-79c0-11 8-16 15-16 8 0 16 6 16 17l-4 56 72-72c3 11 9 20 19 27l-68 68zm185-75l5 79c0 19-15 32-32 33l-80-5c-11 0-16-5-16-16v-1c0-8 8-15 16-15l56 5-68-68c10-7 16-16 19-27l72 72-4-56v-2c0-11 8-15 15-15 9 0 15 5 17 16z";
const ltr = false;
const accData = null;
const collection = "tnt-v3";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v3/network-node";
export { pathData, ltr, accData };