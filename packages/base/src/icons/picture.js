import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://picture";
const transform = "translate(80.5,35)";
const d = "M416 448q14 0 23 -9t9 -23v-384q0 -13 -9 -22.5t-23 -9.5h-384q-14 0 -23 9.5t-9 22.5v384q0 14 9 23t23 9h384zM416 416h-384v-320h384v320zM288 288l96 -160h-192zM194 192h-130v160h140q-5 -11 -8.5 -22.5t-3.5 -25.5q0 -20 7 -38t19 -32zM236 263q-5 9 -8.5 19.5 t-3.5 21.5q0 34 23.5 57t56.5 23q34 0 57 -23t23 -57q0 -19 -8 -35t-22 -27l-66 109z";

registerIcon(name, transform, d);

export default {name, transform, d};
