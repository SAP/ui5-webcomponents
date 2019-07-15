import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://sys-enter";
const viewBox = "0 -32 512 512";
const d = "M256 480q53 0 100-20t81.5-54.5T492 324t20-100-20-99.5T437.5 43 356-12 256-32t-99.5 20T75 43t-55 81.5T0 224t20 100 55 81.5 81.5 54.5 99.5 20zm0-480q46 0 87 17.5t71.5 48 48 71T480 224q0 46-17.5 87t-48 71.5-71.5 48-87 17.5q-47 0-87.5-17.5t-71-48-48-71.5T32 224q0-47 17.5-87.5t48-71 71-48T256 0zm130 315q4-3 4.5-8t-2.5-9L243 92q-3-6-10.5-7T219 89L116 206q-5 4-5 9.5t5 9.5l22 23q11 11 20 0l56-54q5-5 12-4.5t11 8.5l103 136q4 7 10.5 8t12.5-4z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
