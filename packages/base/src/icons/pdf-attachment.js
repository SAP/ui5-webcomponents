import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://pdf-attachment";
const transform = "translate(49,35)";
const d = "M449 195q22 0 42 -11t20 -26q0 -23 -34 -23q-18 0 -41.5 5.5t-39.5 14.5q-32 -7 -57.5 -13t-42.5 -11q-33 -51 -54 -51l-7 1q-21 7 -21 26q0 17 30 37l31 12q28 45 42 89q-7 7 -9 22t-2 25q0 22 7 37.5t21 15.5q11 0 17.5 -12t6.5 -36q0 -10 -1.5 -22t-5.5 -26 q26 -48 50 -63l31 7q10 2 17 2zM363 178q-14 13 -24 30l-21 -40zM384 48v-48q0 -14 -9 -23t-23 -9h-320q-14 0 -23 9t-9 23v352l128 128h224q13 0 22.5 -9t9.5 -23v-64h-32v64h-192v-96q0 -14 -9.5 -23t-23.5 -9h-95v-320h320v48h32z";

registerIcon(name, transform, d);

export default {name, transform, d};
