import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://lab";
const transform = "translate(80.5,35)";
const d = "M192 192h64l92 -134q6 -8 2 -17t-14 -9h-224q-11 0 -15 9t2 17zM176 64q6 0 11 4.5t5 11.5t-5 11.5t-11 4.5q-16 0 -16 -16t16 -16zM240 128q-16 0 -16 -16t16 -16q6 0 11 4.5t5 11.5t-5 11.5t-11 4.5zM441 58q7 -10 7 -22v-34q0 -14 -9.5 -24t-24.5 -10h-380 q-14 0 -24 10t-10 24v34q0 11 8 22l152 195v195h-16q-16 0 -16 16t16 16h16q13 0 22.5 -9.5t9.5 -22.5v-196q0 -10 -7 -20l-147 -188q-6 -8 -6 -19v-25h384v25q0 10 -7 19l-147 188q-6 9 -6 20v196q0 13 9 22.5t23 9.5h16q6 0 11 -4.5t5 -11.5t-5 -11.5t-11 -4.5h-16v-195z ";

registerIcon(name, transform, d);

export default {name, transform, d};
