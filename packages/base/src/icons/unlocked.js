import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://unlocked";
const transform = "translate(112.5,35)";
const d = "M320 256q26 0 45 -19t19 -45v-160q0 -26 -19 -45t-45 -19h-256q-27 0 -45.5 19t-18.5 45v160q0 18 8.5 32.5t22.5 22.5v27t0.5 28t0.5 22.5v11.5q0 30 12.5 56t34 45.5t51 31t62.5 11.5t62 -11.5t51 -29.5t34.5 -41t12.5 -46h-64q0 11 -7.5 22.5t-20.5 20.5t-30.5 15 t-37.5 6q-40 0 -68 -23.5t-28 -56.5q0 -2 -0.5 -14t-0.5 -26v-26t1 -14h224zM352 192q0 14 -9.5 23t-22.5 9h-256q-14 0 -23 -9t-9 -23v-160q0 -13 9 -22.5t23 -9.5h256q13 0 22.5 9.5t9.5 22.5v160zM241 143q0 -15 -8 -27.5t-21 -17.5l44 -66h-128l43 66q-13 5 -21 17.5 t-8 27.5q0 20 14.5 34.5t35.5 14.5q20 0 34.5 -14.5t14.5 -34.5z";

registerIcon(name, transform, d);

export default {name, transform, d};
