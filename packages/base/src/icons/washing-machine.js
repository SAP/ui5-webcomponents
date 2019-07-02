import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://washing-machine";
const transform = "translate(80.5,35)";
const d = "M352 321q-13 0 -22.5 9.5t-9.5 22.5q0 14 9.5 23t22.5 9q14 0 23 -9t9 -23q0 -13 -9 -22.5t-23 -9.5zM416 448q14 0 23 -8.5t9 -22.5v-384q0 -13 -9 -23t-23 -10h-384q-13 0 -22.5 10t-9.5 23v384q0 14 9.5 22.5t22.5 8.5h384zM416 417h-384v-384h384v384zM224 65 q-26 0 -49.5 10t-41 27.5t-27.5 40.5t-10 50t10 50t27.5 40.5t41 27.5t49.5 10q27 0 50.5 -10t40.5 -27.5t27 -40.5t10 -50t-10 -50t-27 -40.5t-40.5 -27.5t-50.5 -10zM224 289q-40 0 -68 -28t-28 -68t28 -68t68 -28t68 28t28 68q0 41 -27.5 68.5t-68.5 27.5z";

registerIcon(name, transform, d);

export default {name, transform, d};
