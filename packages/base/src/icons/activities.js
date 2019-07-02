import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://activities";
const transform = "translate(48.5,35)";
const d = "M480 448q13 0 22.5 -9t9.5 -23v-384q0 -13 -9.5 -22.5t-22.5 -9.5h-448q-14 0 -23 9.5t-9 22.5v384q0 14 9 23t23 9h448zM480 416h-448v-384h448v384zM117 228l-53 53l17 19l36 -36l71 88l18 -17zM117 64l-53 54l17 18l36 -36l71 89l18 -18zM400 160q16 0 16 -16 q0 -6 -4.5 -11t-11.5 -5h-128q-6 0 -11 5t-5 11q0 7 5 11.5t11 4.5h128zM400 320q16 0 16 -16q0 -6 -4.5 -11t-11.5 -5h-128q-6 0 -11 5t-5 11q0 7 5 11.5t11 4.5h128z";

registerIcon(name, transform, d);

export default {name, transform, d};
