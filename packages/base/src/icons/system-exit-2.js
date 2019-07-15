import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://system-exit-2";
const viewBox = "0 -32 512 512";
const d = "M256 480q53 0 100-20t81.5-55 54.5-81.5 20-99.5-20-100-54.5-81.5T356-12 256-32t-99.5 20T75 42.5 20 124 0 224t20 99.5T75 405t81.5 55 99.5 20zm128-371q16 16 0 33l-99 103q-13 11-28 11-18 0-28-12L128 142q-8-8-8-17t8-17 17-8 17 8l95 97 93-96q5-5 9.5-6.5t7.5-1.5q10 0 17 8zm0 115q17 17 0 34l-99 102q-13 11-28 11-17 0-28-11L128 258q-8-8-8-17.5t8-17.5q7-7 17-7t17 7l95 98 93-96q5-6 9.5-7.5t7.5-1.5q9 0 17 8z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
