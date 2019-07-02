import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://master-task-triangle";
const transform = "translate(64.5,35)";
const d = "M472 109q9 -19 7.5 -38.5t-11 -35t-26 -25.5t-37.5 -10h-298q-21 0 -37.5 10t-26.5 25.5t-11 35t8 38.5l51 101q5 -1 10 -1.5t11 -0.5q4 0 7 0.5t7 0.5l-58 -115q-10 -22 2 -42t37 -20h298q24 0 36 20q13 21 2 42l-149 298q-8 18 -30 23l-6 16t-8 16q2 0 3 0.5t3 0.5 q20 0 38 -10.5t29 -30.5zM112 256q-23 0 -43.5 9t-35.5 24t-24 35.5t-9 43.5t9 43.5t24 35.5t35.5 24t43.5 9t43.5 -9t35.5 -24t24 -35.5t9 -43.5t-9 -43.5t-24 -35.5t-35.5 -24t-43.5 -9z";

registerIcon(name, transform, d);

export default {name, transform, d};
