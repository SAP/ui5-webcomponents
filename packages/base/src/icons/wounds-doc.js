import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://wounds-doc";
const transform = "translate(48.5,35)";
const d = "M512 416v-64h-64v-64h-64v64h-64v64h64v64h64v-64h64zM224 224q26 0 49.5 -10t41 -27.5t27.5 -40.5t10 -50v-128h-352v128q0 27 10 50t27.5 40.5t41 27.5t49.5 10h32h16h48zM252 188q-12 4 -28 4h-96q-40 0 -68 -28t-28 -68v-96h59zM320 96q0 43 -32 72v-168h32v96z M288 337q0 -23 -9 -43.5t-24 -36t-35.5 -24.5t-43.5 -9t-43.5 9t-35.5 24.5t-24 36t-9 43.5t9 43t24 35t35.5 24t43.5 9t43.5 -9t35.5 -24t24 -35t9 -43zM176 416q-26 0 -48 -16l123 -38q-8 24 -28.5 39t-46.5 15zM176 256q31 0 53.5 21t25.5 51l-80 24h-77q-2 -10 -2 -15 q0 -34 23.5 -57.5t56.5 -23.5z";

registerIcon(name, transform, d);

export default {name, transform, d};
