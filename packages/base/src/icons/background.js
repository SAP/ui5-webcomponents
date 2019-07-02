import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://background";
const transform = "translate(80.5,35)";
const d = "M336 288q-20 0 -34 14t-14 34t14 34t34 14t34 -14t14 -34t-14 -34t-34 -14zM416 448q14 0 23 -9t9 -23v-384q0 -14 -9 -23t-23 -9h-384q-13 0 -22.5 9t-9.5 23v384q0 14 9.5 23t22.5 9h384zM416 416h-384v-384h384v384zM324 128l-58 85l22 43l96 -128h-60zM317 96h-255 l130 183z";

registerIcon(name, transform, d);

export default {name, transform, d};
