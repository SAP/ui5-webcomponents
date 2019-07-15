import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://initiative";
const viewBox = "0 -32 512 512";
const d = "M256 480q53 0 99.5-20t81.5-54.5 55-81.5 20-100-20-99.5T437 43t-81.5-55T256-32 156-12 74.5 43 20 124.5 0 224t20 100 54.5 81.5T156 460t100 20zm0-480q46 0 87 17.5t71.5 48 48 71.5 17.5 87-17.5 87-48 71.5-71.5 48-87 17.5q-47 0-87.5-17.5t-71-48-48-71.5T32 224t17.5-87 48-71.5 71-48T256 0zm7 212q11 12 0 23l-62 63q-10 10-10 23t10 22q9 10 22 10t23-10l96-97q9-9 9-22.5t-9-22.5l-96-97q-10-10-23-10t-23 10q-9 9-9 22.5t9 22.5z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
