import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://desktop-mobile";
const transform = "translate(48.5,35)";
const d = "M32 160h288v-32h-288q-13 0 -22.5 9.5t-9.5 22.5v256q0 14 9.5 23t22.5 9h352q14 0 23 -9t9 -23v-128h-32v128h-352v-256zM272 96q16 0 16 -16q0 -6 -4.5 -11t-11.5 -5h-128q-6 0 -11 5t-5 11q0 7 5 11.5t11 4.5h128zM480 256q13 0 22.5 -9t9.5 -23v-192q0 -14 -9.5 -23 t-22.5 -9h-96q-14 0 -23 9t-9 23v192q0 14 9 23t23 9h96zM480 224h-96v-192h96v192z";

registerIcon(name, transform, d);

export default {name, transform, d};
