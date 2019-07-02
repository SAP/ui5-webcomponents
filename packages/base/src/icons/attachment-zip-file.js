import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://attachment-zip-file";
const transform = "translate(88.5,35)";
const d = "M289 383v-31h-34v31h34zM320 383h-31v33h31v-33zM289 447v-31h-34v31h34zM320 320h-31v32h31v-32zM215 162q0 8 3 21t7 25l33 81v31h31v-31h30l36 -99l6 -28q0 -30 -22 -52t-52 -22t-51 22t-21 52zM313 188q-11 12 -24 12q-15 0 -27.5 -12.5t-12.5 -27.5 q0 -13 11.5 -24.5t24.5 -11.5q15 0 27.5 12.5t12.5 27.5q0 13 -12 24zM320 447h-31v33h31v-33zM400 480h-32v-31h32v-449h-368v321h95q14 0 23.5 9t9.5 22v97h64v31h-96l-128 -128v-352q0 -13 9.5 -22.5t22.5 -9.5h368q14 0 23 9.5t9 22.5v448q0 14 -9 23t-23 9z";

registerIcon(name, transform, d);

export default {name, transform, d};
