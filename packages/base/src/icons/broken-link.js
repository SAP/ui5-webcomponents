import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://broken-link";
const transform = "translate(48.5,35)";
const d = "M235 112h45l-86 -87q-13 -13 -29.5 -19t-33.5 -6t-33 6t-29 19l-11 12q-26 26 -26 62t26 62l70 71v-46l-47 -47q-17 -17 -17 -40t17 -40l11 -11q16 -16 39 -16q24 0 40 16zM442 411q13 -13 19.5 -29t6.5 -33t-6.5 -33.5t-19.5 -29.5l-74 -74q-25 -25 -62 -25t-62 25 l-12 12q-2 2 -4 5l-4 6l21 21l21 -21q16 -16 40 -16t40 16l74 74q16 17 16 39.5t-16 39.5l-12 12q-16 16 -39 16q-22 0 -40 -16l-41 -41v45l18 18q28 26 63 26q17 0 33 -6.5t29 -19.5zM184 352h-16v128h16v-128zM128 296h-128v16h128v-16zM328 96h16v-128h-16v128zM512 152 v-16h-128v16h128z";

registerIcon(name, transform, d);

export default {name, transform, d};
