import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "line-chart";
const pathData = "M108 417q-7 0-13-4.5T89 400q0-12 11-18l115-34 110 17 110-52q1-1 7-1 17 0 17 18 0 13-11 16l-120 57-108-18-104 29q-2 3-8 3zm0-51q-6 0-12.5-5T89 348q0-9 9-15l116-78 109 19 109-88q6-2 9-2 18 0 18 17 0 11-9 17l-120 94-109-18-103 69q-5 3-10 3zm0-73q-6 0-12-4.5T90 276q0-9 7-15l113-96h108L428 38q6-6 13-6 8 0 13 6t5 13-4 11L335 202H224l-104 87q-4 4-12 4zm388 155v32H17V32h31v416h448z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/line-chart";
export { pathData, ltr, accData };