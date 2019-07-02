import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://attachment-e-pub";
const transform = "translate(82.5,35)";
const d = "M435 214q5 -8 5 -14q0 -7 -5 -12l-104 -104q-5 -5 -13 -5q-7 0 -12 5l-104 104q-5 5 -5 12q0 9 5 14l104 102q3 6 12 6q7 0 13 -6l65 -63l-77 -78l-27 25l53 53l-26 25l-78 -78l78 -77l103 103zM352 32h32v-32q0 -14 -9 -23t-23 -9h-320q-14 0 -23 9t-9 23v352l128 128 h224q13 0 22.5 -9t9.5 -23v-64h-32v64h-192v-96q0 -14 -9.5 -23t-23.5 -9h-95v-320h320v32z";

registerIcon(name, transform, d);

export default {name, transform, d};
