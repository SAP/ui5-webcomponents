import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://iphone";
const transform = "translate(144.5,35)";
const d = "M256 480q26 0 45 -19t19 -45v-384q0 -27 -19 -45.5t-45 -18.5h-192q-26 0 -45 18.5t-19 45.5v384q0 26 19 45t45 19h192zM160 0q10 0 17 6.5t7 17.5q0 10 -7 17t-17 7t-17 -7t-7 -17q0 -11 7 -17.5t17 -6.5zM288 416h-256v-352h256v352z";

registerIcon(name, transform, d);

export default {name, transform, d};
