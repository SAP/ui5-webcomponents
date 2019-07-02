import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://permission";
const transform = "translate(57,35)";
const d = "M467 233q11 0 18 -7.5t7 -18.5v-102q0 -11 -7 -19t-18 -8h-147q-11 0 -19 8t-8 19v102q0 11 8 18.5t19 7.5h7v42q0 6 3 18.5t11.5 25t23.5 22.5t40 10q26 0 41.5 -11t23 -24t9.5 -25t2 -13h-34q0 4 -2.5 10.5t-7.5 13t-13 11t-19 4.5q-12 0 -20 -4.5t-13 -11t-7.5 -13.5 t-2.5 -13v-42h105zM402 157q16 5 16 23q0 11 -7.5 18t-17.5 7q-11 0 -18.5 -7t-7.5 -18q0 -8 5 -14t12 -9l-17 -50h51zM384 48v-48q0 -14 -9 -23t-23 -9h-320q-14 0 -23 9t-9 23v352l128 128h224q13 0 22.5 -9t9.5 -23v-48h-32v48h-192v-96q0 -14 -9.5 -23t-23.5 -9h-95 v-320h320v48h32z";

registerIcon(name, transform, d);

export default {name, transform, d};
