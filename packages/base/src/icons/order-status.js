import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://order-status";
const transform = "translate(112.5,35)";
const d = "M95 179l-30 33l16 15l14 -14l46 47l15 -16zM156 136l-31 -30l31 -31l-16 -15l-30 30l-31 -30l-15 15l30 31l-30 30l15 15l31 -30l30 30zM304 224q16 0 16 -16q0 -6 -4.5 -11t-11.5 -5h-96q-6 0 -11 5t-5 11q0 7 5 11.5t11 4.5h96zM304 128q16 0 16 -16q0 -6 -4.5 -11 t-11.5 -5h-96q-6 0 -11 5t-5 11q0 7 5 11.5t11 4.5h96zM352 480q14 0 23 -9.5t9 -22.5v-448q0 -14 -9 -23t-22 -9h-320q-14 0 -23.5 9t-9.5 23v352l128 128h224zM353 0l-1 448h-192v-96q0 -14 -9.5 -23t-22.5 -9h-96v-320h321z";

registerIcon(name, transform, d);

export default {name, transform, d};
