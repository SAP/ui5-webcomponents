import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://locked";
const transform = "translate(112.5,35)";
const d = "M352 247q14 -8 23 -22.5t9 -32.5v-159q0 -27 -19 -45.5t-45 -18.5h-256q-27 0 -45.5 18.5t-18.5 45.5v159q0 18 8.5 32.5t22.5 22.5v25t0.5 28.5t0.5 24v12.5q0 30 12.5 56t34 45.5t51 31t62.5 11.5t62 -11.5t51 -31t34.5 -45.5t12.5 -56v-90zM96 337v-10.5t-0.5 -20.5 t-0.5 -25.5v-24.5h193v81q0 33 -28 56.5t-68 23.5t-68 -23.5t-28 -56.5zM352 192q0 14 -9.5 23.5t-22.5 9.5h-256q-14 0 -23 -9.5t-9 -23.5v-159q0 -14 9 -23.5t23 -9.5h256q13 0 22.5 9.5t9.5 23.5v159zM241 143q0 -15 -8 -27t-21 -18l44 -65h-128l43 65q-13 6 -21 18 t-8 27q0 20 14.5 34.5t35.5 14.5q20 0 34.5 -14.5t14.5 -34.5z";

registerIcon(name, transform, d);

export default {name, transform, d};
