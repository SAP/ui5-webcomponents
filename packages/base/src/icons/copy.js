import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://copy";
const transform = "translate(80.5,35)";
const d = "M320 384q13 0 22.5 -9t9.5 -23v-352q0 -14 -9 -23t-23 -9h-287q-14 0 -23.5 9t-9.5 23v288l96 96h224zM320 352h-192v-64q0 -14 -9.5 -23t-23.5 -9h-62v-256h287v352zM416 480q12 0 22 -9t10 -23v-352q0 -14 -9 -23t-23 -9h-32v32h32v352h-192v-32h-97l65 64h224z M240 160q16 0 16 -16q0 -6 -4.5 -11t-11.5 -5h-128q-6 0 -11 5t-5 11q0 7 5 11.5t11 4.5h128zM240 96q16 0 16 -16q0 -6 -4.5 -11t-11.5 -5h-128q-6 0 -11 5t-5 11q0 7 5 11.5t11 4.5h128z";

registerIcon(name, transform, d);

export default {name, transform, d};
