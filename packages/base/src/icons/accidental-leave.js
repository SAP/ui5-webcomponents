import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://accidental-leave";
const transform = "translate(80.5,35)";
const d = "M159 160h-95v128h95v96h129v-96h96v-128h-96v-96h-129v96zM192 192v-96h64v96h95v64h-95v96h-64v-96h-96v-64h96zM416 448q14 0 23 -8.5t9 -22.5v-385q0 -13 -9 -23t-23 -10h-384q-13 0 -22.5 10t-9.5 23v385q0 14 9.5 22.5t22.5 8.5h384zM415 416h-383v-384h383v384z ";

registerIcon(name, transform, d);

export default {name, transform, d};
