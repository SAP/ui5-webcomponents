import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://insurance-house";
const transform = "translate(48.5,35)";
const d = "M512 64h-64v-96h-192v96h-64l160 160zM416 96q-17 18 -31 32l-22 22t-9 10h-2h-2l-10 -10q-5 -5 -10 -10.5t-11 -11.5q-14 -14 -31 -32v-96h32v64h64v-64h32v96zM32 0h192v-32h-191q-14 0 -23.5 9t-9.5 23v352l128 128h224q14 0 23 -9.5t9 -22.5v-145h-32v145h-192v-96 q0 -14 -9.5 -23t-22.5 -9h-96v-320z";

registerIcon(name, transform, d);

export default {name, transform, d};
