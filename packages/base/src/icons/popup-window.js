import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://popup-window";
const transform = "translate(48.5,35)";
const d = "M480 480q14 0 23 -9.5t9 -22.5v-288q0 -14 -9 -23t-23 -9h-320q-13 0 -22.5 9t-9.5 23v288q0 13 9.5 22.5t22.5 9.5h320zM480 448h-320v-288h320v288zM368 0q16 0 16 -16q0 -6 -4.5 -11t-11.5 -5h-224q-6 0 -11 5t-5 11q0 7 5 11.5t11 4.5h224zM480 96h32v-32 q0 -13 -9 -22.5t-23 -9.5h-448q-13 0 -22.5 9.5t-9.5 22.5v320q0 14 9.5 23t22.5 9h64v-32h-64v-320h448v32z";

registerIcon(name, transform, d);

export default {name, transform, d};
