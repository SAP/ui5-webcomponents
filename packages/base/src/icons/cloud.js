import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://cloud";
const transform = "translate(48.5,35)";
const d = "M448 256q29 -15 46.5 -43t17.5 -63q0 -23 -8.5 -44t-27.5 -37.5t-49.5 -26.5t-74.5 -10h-224q-25 1 -48 11t-41 26t-28.5 37.5t-10.5 44.5q0 39 21.5 65.5t57.5 39.5q-8 31 1 59.5t29 49.5t48 33.5t57 12.5q31 0 59 -15t48 -50q24 9 43 9q21 0 36.5 -9t26 -23.5t16 -32 t5.5 -34.5zM352 64q61 0 94.5 22.5t33.5 63.5q0 25 -12.5 45.5t-34.5 31.5l-17 9v20q0 10 -3 22t-9.5 22t-16.5 16.5t-23 6.5q-16 0 -31 -7l-26 -11l-14 25q-17 30 -39.5 39.5t-39.5 9.5q-25 0 -48.5 -12t-39.5 -32q-9 -11 -15.5 -29.5t-0.5 -42.5l7 -28l-27 -10 q-20 -7 -39 -23.5t-19 -50.5q0 -16 8 -31.5t21.5 -27.5t31 -20t35.5 -8h224z";

registerIcon(name, transform, d);

export default {name, transform, d};
