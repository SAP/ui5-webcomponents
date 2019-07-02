import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://laptop";
const transform = "translate(48.5,35)";
const d = "M96 160q-14 0 -23 9.5t-9 22.5v224q0 14 9 23t23 9h320q13 0 22.5 -9t9.5 -23v-224q0 -13 -9.5 -22.5t-22.5 -9.5h-320zM96 192h320v224h-320v-224zM512 37q0 -15 -11 -26t-26 -11h-438q-15 0 -26 11t-11 26l73 91h366zM320 32l-32 32h-64l-32 -32h128z";

registerIcon(name, transform, d);

export default {name, transform, d};
