import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://map";
const transform = "translate(112.5,35)";
const d = "M212 479q36 -3 67.5 -19.5t55 -42t36.5 -59t13 -70.5q0 -14 -8 -35.5t-21.5 -46.5t-30.5 -52t-35 -54q-42 -62 -95 -132q-55 69 -97 131q-18 26 -35.5 53.5t-31 53t-22 47t-8.5 35.5q0 40 15 75t41 61t61 41t75 15h1h1h9t9 -1zM194 21q30 41 58.5 82.5t50.5 78t35.5 64.5 t13.5 42q0 31 -11 58.5t-30 49t-45 35.5t-57 17h-14h-2h-1h-1q-33 0 -61.5 -12.5t-50.5 -34.5t-34.5 -51t-12.5 -62q0 -15 15 -45t38.5 -67t52 -78t56.5 -77zM192 384q40 0 68 -28t28 -68t-28 -68t-68 -28t-68 28t-28 68t28 68t68 28zM192 224q27 0 45.5 19t18.5 45 q0 27 -18.5 45.5t-45.5 18.5q-26 0 -45 -18.5t-19 -45.5q0 -26 19 -45t45 -19z";

registerIcon(name, transform, d);

export default {name, transform, d};
