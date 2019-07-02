import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://per-diem";
const transform = "translate(50.5,35)";
const d = "M187 288h37v-160h-32v128h-42zM444 5q27 0 49 16l7 6v-45q-29 -12 -54 -12q-51 0 -79 21t-42 66h-37l8 32h23v15v1h-31l8 32h28q11 38 43.5 61.5t79.5 23.5q34 0 57 -14l4 -2l-10 -39l-5 4q-14 9 -33 12.5t-38 -0.5t-33.5 -15.5t-19.5 -30.5h119l-8 -32h-115v-16h115 l-8 -32h-102q17 -52 74 -52zM32 0h192v-32h-192q-14 0 -23 9t-9 23v416q0 13 9 22.5t23 9.5h64v32h32v-32h192v32h32v-32h64q13 0 22.5 -9.5t9.5 -22.5v-96h-32v32h-384v-352zM320 384h32v32h-32v-32zM96 384h32v32h-32v-32z";

registerIcon(name, transform, d);

export default {name, transform, d};
