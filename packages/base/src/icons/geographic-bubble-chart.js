import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://geographic-bubble-chart";
const transform = "translate(80.5,35)";
const d = "M319 395h-37l37 53v-53zM411 448h36v-146l-36 37v-37h-19l-18 37h-36l-37 -55h-36v55l36 32h37zM384 240q20 0 34 -14t14 -34t-14 -34t-34 -14t-34 14t-14 34t14 34t34 14zM447 202q-4 23 -21.5 38.5t-41.5 15.5h63v-54zM264 256h120q-26 0 -45 -19t-19 -45 q0 -27 19 -45.5t45 -18.5q20 0 37 12l-6 -12l-64 -96l-50 -32v119l-74 74zM96 160q0 -26 19 -45t45 -19h6.5t6.5 1l-45 -97l-34 31l-15 95l-46 87l-33 15v220h96q-26 0 -45 -19t-19 -45q0 -27 19 -45.5t45 -18.5t45 18.5t19 45.5q0 26 -19 45t-45 19h95v-56l-64 -104v-37 l-37 37h-53v-49l87 -27q-13 -8 -20.5 -21.5t-7.5 -30.5zM96 336q-20 0 -34 14t-14 34t14 34t34 14t34 -14t14 -34t-14 -34t-34 -14zM160 208q20 0 34 -14t14 -34t-14 -34t-34 -14t-34 14t-14 34t14 34t34 14z";

registerIcon(name, transform, d);

export default {name, transform, d};
