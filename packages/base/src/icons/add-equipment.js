import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://add-equipment";
const transform = "translate(48.5,35)";
const d = "M416 384h96v-32h-96v-96h-32v96h-96v32h96v96h32v-96zM439 99q9 -10 9 -22.5t-9 -21.5l-46 -46q-9 -9 -21 -9q-14 0 -23 9l-163 164q-23 -10 -52 -10q-47 0 -83 26.5t-51 66.5h118q14 0 27.5 9.5t13.5 23.5v32q0 14 -13.5 23t-27.5 9h-118q15 42 51 68.5t83 26.5 q30 0 55.5 -11.5t45 -31t30.5 -45.5t11 -55q0 -20 -6 -39zM416 76l-168 168l-14 13l5 18q3 9 4 16t1 14q0 23 -8.5 43t-23.5 35t-35 24t-43 9q-46 0 -77 -33h61q13 0 26 -5t23.5 -13t17 -19.5t6.5 -24.5v-32q0 -13 -6.5 -24.5t-17 -20.5t-23.5 -14t-26 -5h-61q15 -14 35 -22 t42 -8q17 0 41 8l19 8l15 -15l163 -164z";

registerIcon(name, transform, d);

export default {name, transform, d};
