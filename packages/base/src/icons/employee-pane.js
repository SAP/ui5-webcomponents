import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://employee-pane";
const transform = "translate(80.5,35)";
const d = "M320 288q0 -40 -28 -68t-68 -28t-68 28t-28 68t28 68t68 28t68 -28t28 -68zM224 224q26 0 45 18.5t19 45.5q0 26 -19 45t-45 19t-45 -19t-19 -45q0 -27 19 -45.5t45 -18.5zM224 96h96v-32h-96v32zM416 448q14 0 23 -9t9 -23v-384q0 -14 -9 -23t-23 -9h-32h-320h-32 q-13 0 -22.5 9t-9.5 23v384q0 14 9.5 23t22.5 9h384zM352 64q0 96 -96 96h-32h-32q-96 0 -96 -96v-32h256v32zM416 416h-384v-384h32v32q0 26 7 49.5t22.5 41t39.5 27.5t59 10h32h32q35 0 59.5 -10t39.5 -27.5t22 -41t7 -49.5v-32h32v384z";

registerIcon(name, transform, d);

export default {name, transform, d};
