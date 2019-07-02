import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://record";
const transform = "translate(80,35)";
const d = "M223 335q24 0 44.5 -8.5t36 -23.5t24 -35.5t8.5 -43.5q0 -24 -8.5 -44t-24 -35.5t-36 -24t-44.5 -8.5q-23 0 -43 8.5t-35.5 24t-24 35.5t-8.5 44q0 23 8.5 43.5t24 35.5t35.5 23.5t43 8.5zM416 448q13 0 22.5 -9.5t9.5 -22.5v-384q0 -14 -9.5 -23t-22.5 -9h-384 q-14 0 -23 9t-9 23v384q0 13 9 22.5t23 9.5h384zM416 416h-384v-384h384v384z";

registerIcon(name, transform, d);

export default {name, transform, d};
