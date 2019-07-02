import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://write-new-document";
const transform = "translate(48.5,35)";
const d = "M32 0h64v-32h-63q-14 0 -23.5 9t-9.5 23v352l128 128h224q14 0 23 -9.5t9 -22.5v-96h-32v96h-192v-96q0 -14 -9.5 -23t-22.5 -9h-96v-320zM507 282q5 -5 5 -11t-5 -11l-260 -261q-1 -1 -17 -6t-36 -10q-23 -7 -51 -15q9 27 17 49q7 18 12.5 33.5t6.5 16.5l261 260 q5 5 11 5t11 -5zM410 208l-22 22l-182 -181l23 -22zM473 271l-22 22l-41 -40l23 -23z";

registerIcon(name, transform, d);

export default {name, transform, d};
