import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://project-definition-triangle";
const transform = "translate(80.5,35)";
const d = "M440 109q9 -19 8 -38.5t-11 -35t-26.5 -25.5t-37.5 -10h-297q-21 0 -37.5 10t-26.5 25.5t-11.5 35t7.5 38.5l149 298q11 20 29 30.5t38 10.5t38.5 -10.5t29.5 -30.5zM410 52q13 21 2 42l-149 298q-11 24 -39 24q-12 0 -22.5 -6.5t-15.5 -17.5l-149 -298q-11 -21 2 -42 q12 -20 37 -20h297q25 0 37 20z";

registerIcon(name, transform, d);

export default {name, transform, d};
