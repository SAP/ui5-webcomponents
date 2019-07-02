import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://simple-payment";
const transform = "translate(112.5,35)";
const d = "M352 480q14 0 23 -9t9 -23v-448q0 -13 -9 -22.5t-23 -9.5h-320q-14 0 -23 9.5t-9 22.5v448q0 14 9 23t23 9h320zM352 448h-320v-448h320v448zM205 239q42 -9 59 -31t17 -43q0 -31 -20.5 -53.5t-55.5 -24.5v-33h-25v32q-26 1 -47 20t-25 57l41 5q3 -14 12 -25t19 -15v73 q-32 11 -51.5 32.5t-19.5 44.5q0 12 5 25t14.5 24t22.5 18.5t29 8.5v21h25v-21q58 -4 70 -62l-36 -6q-2 12 -11 20t-23 9v-76zM205 124q14 4 23.5 14.5t9.5 22.5q0 24 -33 35v-72zM180 316q-11 -4 -18 -13t-7 -19q0 -20 25 -32v64z";

registerIcon(name, transform, d);

export default {name, transform, d};
