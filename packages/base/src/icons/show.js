import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://show";
const transform = "translate(48.5,35)";
const d = "M256 384q36 0 72.5 -10t70 -30t62.5 -49.5t51 -69.5q-22 -40 -51 -70t-62.5 -50.5t-70 -30.5t-72.5 -10h-1q-36 0 -72.5 10t-70 30t-62.5 50t-50 70q22 40 51 70t63 50t70 30t72 10zM255 96q66 0 124 34.5t96 94.5q-37 60 -95 93.5t-124 33.5t-124 -34t-95 -94 q37 -60 94.5 -94t123.5 -34zM256 320q40 0 68 -28t28 -68t-28 -68t-68 -28t-68 28t-28 68t28 68t68 28zM295 239q11 0 18 7t7 17q0 11 -7 18t-18 7q-10 0 -17 -7t-7 -18q0 -10 7 -17t17 -7z";

registerIcon(name, transform, d);

export default {name, transform, d};
