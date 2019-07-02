import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://mirrored-task-circle-2";
const transform = "translate(64.5,35)";
const d = "M46 225q-6 -1 -11 3.5t-6 10.5q-1 7 3.5 11.5t11.5 5.5h57q-1 1 -2 1.5t-2 1.5q-13 6 -30 17t-32 26.5t-25 36t-10 45.5t8 43.5t21.5 30t29.5 17t33 5.5h14q6 0 11 -4.5t5 -11.5q0 -16 -16 -16h1q-15 -1 -28.5 -3.5t-24 -9.5t-16.5 -19t-6 -32q0 -19 7.5 -34t20.5 -27 t30 -21.5t36 -18.5l-5 58q-1 6 3.5 11t11.5 6q16 0 16 -15l8 -84q0 -14 -8 -23.5t-22 -11.5zM256 448q46 0 87 -17.5t71.5 -48t48 -71.5t17.5 -87t-17.5 -87t-48 -71.5t-71.5 -48t-87 -17.5q-40 0 -76 13.5t-65 37.5t-49.5 56.5t-28.5 70.5q3 -1 7 -1l88 -1l3 1 q31 3 52.5 27t20.5 56v2l-8 85q-2 25 -20 42t-44 17h-3h-7q28 20 61 31t69 11z";

registerIcon(name, transform, d);

export default {name, transform, d};
