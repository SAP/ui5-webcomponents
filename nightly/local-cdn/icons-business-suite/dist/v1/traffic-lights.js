import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "traffic-lights";
const pathData = "M176 6c0-4 2-6 7-6h179c4 0 6 2 6 6v420c0 4-2 6-6 6H183c-5 0-7-2-7-6V6zm96 154c-31 0-54 24-54 55s23 54 54 54 55-23 55-54-24-55-55-55zm-54 182c0 31 23 55 54 55s55-24 55-55-24-54-55-54-54 23-54 54zm54-310c-31 0-55 24-55 55s24 54 55 54 54-23 54-54-23-55-54-55zM144 256l-96-96h96v96zM400 32h96l-96 96V32zM48 32h96v96zm96 352l-96-96h96v96zm256-96h96l-96 96v-96zm96-128l-96 96v-96h96zM224 506v-36c0-4 2-6 6-6h84c4 0 6 2 6 6v36c0 4-2 6-6 6h-84c-4 0-6-2-6-6z";
const ltr = false;
const accData = null;
const collection = "business-suite-v1";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v1/traffic-lights";
export { pathData, ltr, accData };