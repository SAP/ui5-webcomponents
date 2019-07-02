import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://add-filter";
const transform = "translate(48.475006103515625,35)";
const d = "M512 96v-32h-96v-96h-32v96h-96v32h96v96h32v-96h96zM352 448q20 0 29 -17t-2 -33l-113 -130q-10 -10 -10 -22v-118l-100 -91q-7 -5 -12 -5q-6 0 -11 4.5t-5 11.5v198q0 13 -9 22q-32 37 -57 65l-38.5 44t-17.5 21q-11 16 -2 33t28 17h320zM243 290l4.5 5t12 14 t17.5 20.5t20 23.5q24 28 55 63h-320h1l8 -9.5t20 -23.5t26.5 -30.5t27 -30.5t20.5 -23l8 -9q17 -19 17 -44v-162l64 59v103q0 25 19 44z";

registerIcon(name, transform, d);

export default {name, transform, d};
