import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "traffic-jam";
const pathData = "M113 267c0-3 0-6 1-7l32-80c11-24 32-40 59-40h198c27 0 48 16 59 40l32 80c1 1 1 4 1 7v192c0 12-9 21-21 21h-21c-12 0-21-9-21-21v-22H176v22c0 12-9 21-21 21h-21c-12 0-21-9-21-21V267zm-80-10c-11 0-16-5-16-16V97c0-3 0-5 1-6l24-59C49 13 66 2 86 2h149c20 0 37 11 44 30l24 59c1 1 1 3 1 6v16H49v80h52v32H65v16c0 11-5 16-16 16H33zm420 32H155v106h298V289zm-288-43h278l-21-50c-3-9-10-14-19-14H205c-10 0-17 5-20 14zM56 81h208l-15-37c-2-7-7-10-14-10H86c-7 0-12 3-14 10zm312 261c0-19 13-32 32-32s32 13 32 32-13 32-32 32-32-13-32-32zm-160 32c-19 0-32-13-32-32s13-32 32-32 32 13 32 32-13 32-32 32zM65 153c0-13 11-24 24-24s24 11 24 24-11 24-24 24-24-11-24-24z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/traffic-jam";
export { pathData, ltr, accData };