import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://user-settings";
const transform = "translate(48.5,35)";
const d = "M384 160q26 0 49.5 -10t41 -27.5t27.5 -40.5t10 -50v-64h-320v64q0 27 10 50t27.5 40.5t41 27.5t49.5 10h32h32zM480 32q0 40 -28 68t-68 28h-64q-40 0 -68 -28t-28 -68v-32h256v32zM448 256q0 -40 -28 -68t-68 -28t-68 28t-28 68t28 68t68 28t68 -28t28 -68zM352 192 q26 0 45 19t19 45t-19 45t-45 19t-45 -19t-19 -45t19 -45t45 -19zM232 165q-13 -8 -27 -22q-20 13 -32.5 34t-12.5 47q0 36 23 62.5t58 32.5q-10 -18 -15 -38q-15 -8 -24.5 -23t-9.5 -34q0 -20 11 -35.5t29 -23.5zM157 80l9 -5q-5 -18 -6 -37l-17 -18q-9 -9 -23 -9 q-13 0 -22 9l-46 46q-9 9 -9 22.5t9 22.5l20 20q-3 7 -6.5 14t-5.5 15h-28q-14 0 -23 9.5t-9 22.5v64q0 14 9 23t23 9h28q2 8 5.5 15t6.5 14l-20 20q-9 10 -9 23t9 22l46 46q9 9 22 9q14 0 23 -9l20 -20q7 3 14 6.5t15 5.5v28q0 14 9 23t23 9h64q14 0 23 -9t9 -23v-28 q8 -2 15 -5.5t14 -6.5l20 20q9 9 23 9q13 0 22 -9l46 -46q9 -9 9 -22t-9 -23l-6 -5q-5 7 -10.5 12.5t-11.5 10.5l5 5l-45 45l-20 -20l-3 -3q-5 1 -8.5 1.5t-8.5 0.5q-6 0 -12 -0.5t-12 -1.5q-5 2 -9 3.5t-9 3.5l-22 8v23v28h-64v-28v-23l-22 -8q-6 -2 -12.5 -4.5t-12.5 -5.5 l-20 -10l-17 16l-20 20l-45 -45l20 -20l16 -17l-10 -20q-3 -6 -5.5 -12.5t-4.5 -12.5l-8 -22h-23h-28v-64h28h23l8 -22q2 -6 4.5 -12t5.5 -12l10 -21l-16 -17l-20 -20l45 -45l20 20z";

registerIcon(name, transform, d);

export default {name, transform, d};
