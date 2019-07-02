import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://date-time";
const transform = "translate(48.5,35)";
const d = "M352 288q33 0 62 -12.5t51 -34.5t34.5 -51t12.5 -62t-12.5 -62t-34.5 -51t-51 -34.5t-62 -12.5t-62 12.5t-51 34.5t-34.5 51t-12.5 62t12.5 62t34.5 51t51 34.5t62 12.5zM352 0q27 0 50 10t40.5 27.5t27.5 40.5t10 50t-10 50t-27.5 40.5t-40.5 27.5t-50 10t-50 -10 t-40.5 -27.5t-27.5 -40.5t-10 -50t10 -50t27.5 -40.5t40.5 -27.5t50 -10zM32 0h128v-32h-128q-14 0 -23 9t-9 23v416q0 14 9 23t23 9h64v32h32v-32h192v32h32v-32h64q14 0 23 -9t9 -23v-96h-32v32h-384v-352zM320 384h32v32h-32v-32zM96 384h32v32h-32v-32zM416 128 q16 0 16 -16q0 -6 -4.5 -11t-11.5 -5h-65q-7 0 -11.5 5t-4.5 11v64q0 16 16 16t16 -16v-48h49z";

registerIcon(name, transform, d);

export default {name, transform, d};
