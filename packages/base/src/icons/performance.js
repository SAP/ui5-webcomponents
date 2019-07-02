import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://performance";
const transform = "translate(40,35)";
const d = "M381 277q-53 34 -116 34q-46 0 -83.5 -16t-64.5 -44.5t-42 -68t-15 -85.5q0 -17 3 -34t3 -34q0 -12 -8.5 -21t-20.5 -9q-13 0 -20.5 9.5t-11 23.5t-4 29.5t-0.5 28.5q0 64 20.5 116t56.5 88t84 55.5t103 19.5q52 0 99 -18t82 -50l-21 -13l-31 -20zM508 208 q19 -48 19 -109v-5q0 -12 -0.5 -28.5t-4 -31t-10.5 -24.5t-20 -10t-21.5 8t-8.5 20q0 18 3.5 35t3.5 34q0 64 -25 112l35 54q19 -27 29 -55zM225 125q3 3 15 11l28 20l39 26l43 29l115 75l-75 -115l-28 -43l-26 -39l-20 -29l-11 -14q-17 -17 -40 -17t-40 16.5t-17 39.5 t17 40zM265 59q12 0 20 8.5t8 19.5q0 12 -8 20t-20 8q-11 0 -19.5 -8t-8.5 -20q0 -11 8.5 -19.5t19.5 -8.5z";

registerIcon(name, transform, d);

export default {name, transform, d};
