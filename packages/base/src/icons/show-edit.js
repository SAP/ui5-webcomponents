import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://show-edit";
const transform = "translate(80.5,35)";
const d = "M443 -5q12 -11 0 -23q-5 -5 -11 -5t-11 5l-82 82q-30 -22 -67 -22q-23 0 -43.5 9t-35.5 24t-24 35.5t-9 43.5t9 43.5t24 35.5t35.5 24t43.5 9t43.5 -9t35.5 -24t24 -35.5t9 -43.5q0 -19 -6 -36t-17 -31zM272 64q33 0 56.5 23.5t23.5 56.5t-23.5 56.5t-56.5 23.5 t-56.5 -23.5t-23.5 -56.5t23.5 -56.5t56.5 -23.5zM320 336q0 -16 -16 -16h-224q-16 0 -16 16t16 16h224q16 0 16 -16zM64 240q0 16 16 16h102q-16 -13 -30 -32h-72q-16 0 -16 16zM320 0v-32h-288q-13 0 -22.5 9t-9.5 23v448q0 13 9.5 22.5t22.5 9.5h320q14 0 23 -9.5 t9 -22.5v-160h-16h-16v160h-320v-448h288z";

registerIcon(name, transform, d);

export default {name, transform, d};
