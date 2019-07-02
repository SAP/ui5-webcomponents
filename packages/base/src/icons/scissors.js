import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://scissors";
const transform = "translate(80.5,35)";
const d = "M73 312q-17 17 -17 39v79q0 7 7 7q3 0 5 -2l136 -136l-17 -17l-107 107v-38q0 -12 10 -22l72 -72l-17 -17zM352 192q40 0 68 -28t28 -68t-28 -68t-68 -28t-68 28t-28 68q0 11 1 16l3 12l-36 37l-37 -37l2 -6t1 -6q1 -4 1.5 -7.5t0.5 -8.5q0 -40 -28 -68t-68 -28t-68 28 t-28 68t28 68t68 28h9t9 -2q4 -1 8 -1.5t8 -2.5l249 249q4 2 5 2q7 0 7 -7v-79q0 -21 -16 -39l-92 -92l35 -34q6 2 16 4q5 2 9 2h9zM352 32q26 0 45 19t19 45q0 27 -19 45.5t-45 18.5t-45 -18.5t-19 -45.5q0 -26 19 -45t45 -19zM96 32q26 0 45 19t19 45q0 27 -19 45.5 t-45 18.5t-45 -18.5t-19 -45.5q0 -26 19 -45t45 -19zM271 148q12 17 25 26l-30 29l-17 17l17 17l92 92q9 9 9 22v38l-215 -215q4 -3 7 -6t7 -6q3 -4 5.5 -7t5.5 -7l30 30l17 17l17 -17z";

registerIcon(name, transform, d);

export default {name, transform, d};
