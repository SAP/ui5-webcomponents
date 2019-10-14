import { registerIcon } from "@ui5/webcomponents-base/dist/SVGIconRegistry.js";

const name = "sap-icon://toaster-down";
const d = "M496 32q16 0 16 16t-16 16h-16v224q0 26-19 45t-45 19v-32q14 0 23-9t9-23V64H64v224q0 14 9 23t23 9v32q-26 0-45-19t-19-45V64H16Q0 64 0 48t16-16h480zM381 400q11-12 0-23-12-11-23 0l-87 87V239q0-16-16-16t-16 16v223l-85-85q-5-5-11-5t-11 5q-12 11 0 23l102 101q9 10 22 10t23-10zM208 160q16 0 16 16 0 6-4.5 11t-11.5 5h-96q-6 0-11-5t-5-11q0-7 5-11.5t11-4.5h96zm192-64q16 0 16 16 0 6-4.5 11t-11.5 5H112q-6 0-11-5t-5-11q0-7 5-11.5t11-4.5h288z";

registerIcon(name, d);
