import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://add-contact";
const transform = "translate(48.5,35)";
const d = "M64 96q0 54 24 75t72 21t72 -21t24 -75h-192zM224 256q0 -26 -19 -45t-45 -19t-45 19t-19 45q0 27 19 45.5t45 18.5t45 -18.5t19 -45.5zM304 288q-6 0 -11 5t-5 11q0 7 5 11.5t11 4.5h96q16 0 16 -16q0 -6 -4.5 -11t-11.5 -5h-96zM416 96h96v-32h-96v-96h-32v96h-96v32 h96v96h32v-96zM480 416q14 0 23 -9t9 -23v-160h-32v160h-448v-320h224v-32h-224q-13 0 -22.5 9.5t-9.5 22.5v320q0 14 9.5 23t22.5 9h448zM304 224q-6 0 -11 5t-5 11q0 7 5 11.5t11 4.5h96q16 0 16 -16q0 -6 -4.5 -11t-11.5 -5h-96z";

registerIcon(name, transform, d);

export default {name, transform, d};
