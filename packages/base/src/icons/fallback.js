import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://fallback";
const transform = "translate(48.5,35)";
const d = "M480 416q11 0 18 -5t10 -11q4 -7 4 -16v-95h-32q-1 72 -5 79q-3 6 -9.5 11t-17.5 5h-224l-32 32h-128q-12 0 -18.5 -5t-9.5 -11q-4 -7 -4 -16v-320q0 -13 5 -19t11 -9q7 -4 112 -4v-32h-128q-9 0 -16 4q-6 3 -11 9.5t-5 18.5v384q0 9 4 16q3 6 9.5 11t18.5 5h188l27 -32 h233zM480 224q14 0 23 -9t9 -23v-191q0 -13 -9 -22.5t-23 -9.5h-224q-13 0 -22.5 9.5t-9.5 22.5v191q0 14 9.5 23t22.5 9h224z";

registerIcon(name, transform, d);

export default {name, transform, d};
