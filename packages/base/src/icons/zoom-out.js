import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://zoom-out";
const transform = "translate(80.5,35)";
const d = "M273 288v-32h-193v32h193zM438 54q10 -9 10 -22.5t-10 -22.5q-9 -9 -22 -9t-23 9l-117 118q-45 -31 -100 -31q-36 0 -68 13.5t-56 37.5t-38 56t-14 69q0 36 14 68t38 56t56 38t68 14t68 -14t56 -38t38 -56t14 -68q0 -28 -8.5 -53t-22.5 -47zM176 128q30 0 56 11 t45.5 30.5t31 46t11.5 56.5t-11.5 56t-31 45.5t-45.5 31t-56 11.5t-56.5 -11.5t-46 -31t-30.5 -45.5t-11 -56t11 -56.5t30.5 -46t46 -30.5t56.5 -11z";

registerIcon(name, transform, d);

export default {name, transform, d};
