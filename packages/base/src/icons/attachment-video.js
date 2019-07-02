import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://attachment-video";
const transform = "translate(48.5,35)";
const d = "M32 -32q-14 0 -23 9t-9 23v352l128 128h224q13 0 22.5 -9t9.5 -23v-96h-32v96h-192v-96q0 -14 -9.5 -23t-23.5 -9h-95v-320h320v32h32v-32q0 -14 -9 -23t-23 -9h-320zM480 288q13 0 22.5 -9t9.5 -23v-174q0 -14 -9.5 -23t-22.5 -9q-10 0 -16 5l-81 68q-2 -25 -20 -42 t-43 -17h-128q-26 0 -45 19t-19 45v96q0 27 19 45.5t45 18.5h128q26 0 45 -18.5t19 -45.5v-5l80 65q7 4 16 4zM352 224q0 14 -9 23t-23 9h-128q-14 0 -23 -9t-9 -23v-96q0 -13 9 -22.5t23 -9.5h128q14 0 23 9.5t9 22.5v96zM480 256l-96 -78v-14l96 -82v174z";

registerIcon(name, transform, d);

export default {name, transform, d};
