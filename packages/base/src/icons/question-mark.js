import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://question-mark";
const transform = "translate(80.5,35)";
const d = "M416 448q14 0 23 -9t9 -23v-384q0 -13 -9 -22.5t-23 -9.5h-384q-14 0 -23 9.5t-9 22.5v384q0 14 9 23t23 9h384zM416 416h-384v-384h384v384zM224 345q-23 0 -38 -14.5t-20 -37.5h-48q0 14 7.5 29t21 27t32.5 19.5t42 7.5q43 0 68.5 -21.5t25.5 -55.5q0 -22 -13 -36.5 t-25 -27.5q-8 -9 -15 -15.5t-11.5 -14t-6.5 -17.5t0 -28h-50q0 16 1 27.5t4.5 21t11.5 18.5t23 21l20 17q8 5 15 16t7 21q0 15 -14.5 29t-37.5 14zM224 128q14 0 23 -9t9 -23q0 -13 -9 -22.5t-23 -9.5t-23 9.5t-9 22.5q0 14 9 23t23 9z";

registerIcon(name, transform, d);

export default {name, transform, d};
