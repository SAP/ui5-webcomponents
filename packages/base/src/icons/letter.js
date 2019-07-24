import { registerIcon } from "../SVGIconRegistry.js";

const name = "sap-icon://letter";
const d = "M480 64q14 0 23 9t9 23v320q0 13-9 22.5t-23 9.5H32q-13 0-22.5-9.5T0 416V96q0-14 9.5-23T32 64h448zm0 32H32v320h448V96zm-32 80v-32q0-16-16-16h-32q-16 0-16 16v32q0 6 4.5 11t11.5 5h32q7 0 11.5-5t4.5-11zm-176 48q16 0 16 16 0 6-4.5 11t-11.5 5H112q-6 0-11-5t-5-11q0-7 5-11.5t11-4.5h160zm-96 64q16 0 16 16 0 6-4.5 11t-11.5 5h-64q-6 0-11-5t-5-11q0-7 5-11.5t11-4.5h64z";

registerIcon(name, d);
