import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://sys-back-2";
const transform = "translate(48.5,35)";
const d = "M0 224q0 53 20 100t55 81.5t81.5 54.5t99.5 20t100 -20t81.5 -54.5t54.5 -81.5t20 -100t-20 -99.5t-54.5 -81.5t-81.5 -55t-100 -20t-99.5 20t-81.5 55t-55 81.5t-20 99.5zM371 352q-17 16 -33 0l-103 -99q-11 -13 -11 -28q0 -18 12 -28l102 -101q8 -8 17 -8t17 8t8 17 t-8 17l-97 95l96 93q5 5 6.5 9.5t1.5 7.5q0 10 -8 17zM256 352q-17 17 -34 0l-102 -99q-11 -13 -11 -28q0 -17 11 -28l102 -101q8 -8 17.5 -8t17.5 8q7 7 7 17t-7 17l-98 95l96 93q6 5 7.5 9.5t1.5 7.5q0 9 -8 17z";

registerIcon(name, transform, d);

export default {name, transform, d};
