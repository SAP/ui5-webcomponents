import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://map-2";
const transform = "translate(80.5,35)";
const d = "M416 448q13 0 22.5 -9.5t9.5 -22.5v-384q0 -14 -9.5 -23t-22.5 -9h-384q-14 0 -23 9t-9 23v384q0 13 9 22.5t23 9.5h384zM416 416h-384v-384h384v384zM279 245q-4 9 -4 19q0 23 16 39.5t39 16.5t38.5 -16.5t15.5 -39.5q0 -10 -4 -19l-51 -86zM307 126l28 -14l-14 -28 l-29 14zM235 126l14 29l29 -14l-14 -29zM192 183l29 -14l-15 -29l-28 14zM135 212l28 -15l-14 -28l-29 14zM192 255l-15 -29l-28 14l14 29zM206 283l-110 62v39l124 -72zM234 341l-29 14l15 29l28 -14zM97 64h-33l42 90l29 -14z";

registerIcon(name, transform, d);

export default {name, transform, d};
