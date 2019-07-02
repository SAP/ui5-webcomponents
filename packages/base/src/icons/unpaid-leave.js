import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://unpaid-leave";
const transform = "translate(49,35)";
const d = "M309 240q15 -18 15 -45q0 -32 -19.5 -52t-50.5 -25v-31h-24v30q-35 5 -51 24.5t-20 48.5l44 5q6 -28 27 -37v70q-64 20 -64 74q0 28 17.5 47.5t46.5 22.5v20h24v-20q29 -5 43.5 -20.5t19.5 -38.5l-43 -6q-3 21 -20 27v-66q40 -10 55 -28zM230 335q-22 -7 -22 -30 q0 -20 22 -29v59zM275 167q8 11 8 22q0 10 -6 18.5t-23 13.5v-66q12 3 21 12zM243 46v-40q-50 0 -94 19t-77 51.5t-52 76t-19 93.5q0 51 19 95t52 77t77.5 52t95.5 19q49 0 93 -19t76.5 -52t51.5 -77t19 -93h-40q0 42 -16 79t-43.5 64t-64 43t-76.5 16q-42 0 -79 -16 t-64.5 -43.5t-43.5 -65t-16 -79.5q0 -41 16 -77.5t43 -63.5t63.5 -43t78.5 -16zM512 145l-32 32l-63 -64l-65 64l-32 -32l65 -63l-65 -65l32 -32l65 65l63 -65l32 32l-65 65z";

registerIcon(name, transform, d);

export default {name, transform, d};
