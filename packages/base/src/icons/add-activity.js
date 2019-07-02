import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://add-activity";
const transform = "translate(40.5,35)";
const d = "M416 96h96v-32h-96v-96h-32v96h-96v32h96v96h32v-96zM480 448q13 0 22.5 -9.5t9.5 -22.5v-192h-32v192h-448v-384h192v-32h-192q-14 0 -23 9t-9 23v384q0 13 9 22.5t23 9.5h448zM206 334l-89 -107l-53 54l17 18l36 -36l71 89zM117 100l71 88l18 -17l-89 -107l-53 53 l17 19zM400 320q16 0 16 -16q0 -6 -4.5 -11t-11.5 -5h-128q-6 0 -11 5t-5 11q0 7 5 11.5t11 4.5h128z";

registerIcon(name, transform, d);

export default {name, transform, d};
