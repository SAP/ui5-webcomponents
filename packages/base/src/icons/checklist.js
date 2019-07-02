import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://checklist";
const transform = "translate(80.5,35)";
const d = "M224 256q16 0 24 -11t8 -26v-74q0 -15 -14 -27l-103 -112q-4 -4 -12 -4q-7 0 -11 4l-103 112q-13 11 -13 27v74q0 15 8.5 26t23.5 11h192zM224 219q0 5 -6 5h-181q-5 0 -5 -5v-74q0 -1 14.5 -17t32.5 -36l48 -52l48 52q18 20 33.5 36t15.5 17v74zM13 310q-13 11 -13 27 v74q0 15 8.5 26t23.5 11h192q16 0 24 -11t8 -26v-27h-32v27q0 5 -6 5h-181q-5 0 -5 -5v-74q0 -1 7 -8.5t15 -16.5q10 -11 23 -24h-43zM416 352q16 0 24 -11t8 -26v-74q0 -15 -14 -27l-103 -112q-4 -4 -12 -4q-7 0 -11 4l-20 21v22v27l31 -35l48 52q18 20 33.5 35.5 t15.5 16.5v74q0 5 -6 5h-181q-5 0 -5 -5v-27h-32v27q0 15 8.5 26t23.5 11h192z";

registerIcon(name, transform, d);

export default {name, transform, d};
