import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://bubble-chart";
const transform = "translate(80.5,35)";
const d = "M448 32v-32h-447v448h31v-416h416zM74 101q0 17 11 26t25 9t25.5 -9t11.5 -26q0 -15 -11 -25.5t-26 -10.5t-25.5 10.5t-10.5 25.5zM181 130q-8 8 -12 18.5t-4 21.5q0 23 16 39t39 16t38.5 -16t15.5 -39q0 -22 -15.5 -39t-38.5 -17q-24 0 -39 16zM186 295q-16 -16 -39 -16 t-39 16t-16 39t16 39t39 16t39 -16t16 -39t-16 -39zM387 250q-10 -5 -19.5 -6.5t-18.5 -1.5q-21 0 -39.5 8t-33 21.5t-22.5 31.5t-8 39q0 20 8 38.5t22 32.5t32 22t39 8q20 0 38 -8t32 -21.5t22.5 -31.5t8.5 -38q0 -30 -17 -56t-44 -38zM346 94q-8 8 -12 18t-4 21 q0 23 16 39t39 16t38.5 -16t15.5 -39t-15.5 -39t-38.5 -16q-24 0 -39 16z";

registerIcon(name, transform, d);

export default {name, transform, d};
