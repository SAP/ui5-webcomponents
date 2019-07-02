import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://business-card";
const transform = "translate(48.5,35)";
const d = "M480 416q14 0 23 -9t9 -23v-320q0 -13 -9 -22.5t-23 -9.5h-448q-13 0 -22.5 9.5t-9.5 22.5v320q0 14 9.5 23t22.5 9h448zM480 384h-448v-320h448v320zM160 192q47 0 71.5 -21t24.5 -75h-192q0 54 24.5 75t71.5 21zM224 256q0 -26 -19 -45t-45 -19t-45 19t-19 45 q0 27 19 45.5t45 18.5t45 -18.5t19 -45.5zM400 256q16 0 16 -16q0 -6 -4.5 -11t-11.5 -5h-96q-6 0 -11 5t-5 11q0 7 5 11.5t11 4.5h96zM400 320q16 0 16 -16q0 -6 -4.5 -11t-11.5 -5h-96q-6 0 -11 5t-5 11q0 7 5 11.5t11 4.5h96z";

registerIcon(name, transform, d);

export default {name, transform, d};
