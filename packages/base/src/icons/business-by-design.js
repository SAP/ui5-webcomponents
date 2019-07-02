import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://business-by-design";
const transform = "translate(50,35)";
const d = "M163 75h49v-75h-49v75zM17 140h47v-140h-47v140zM89 177h49v-177h-49v177zM433 352q9 -4 13 -10.5t4 -20.5v-31h-114v31q0 13 5.5 20.5t13.5 11.5t18 5t18 1h6q8 0 18 -1.5t18 -5.5zM496 199q12 0 12 -13v-205q0 -13 -12 -13h-204q-13 0 -13 13v205q0 13 13 13h204z M478 144l-33 23l-83 -118l-35 27l-24 -32l51 -39q3 -4 11 -5q10 0 18 9zM496 480q12 0 12 -13v-204q0 -5 -3.5 -9.5t-8.5 -4.5h-204q-5 0 -9 4.5t-4 9.5v204q0 5 4.5 9t9.5 4h203zM493 457q0 6 -5 6h-186q-6 0 -6 -6v-186q0 -5 6 -5h186q5 0 5 5v186zM361 396q0 16 9.5 23.5 t23.5 7.5q15 0 24 -8.5t9 -25.5q0 -15 -10.5 -22.5t-22.5 -7.5q-14 0 -23.5 8t-9.5 25zM215 480q12 0 12 -13v-205q0 -13 -12 -13h-202q-13 0 -13 13v205q0 13 13 13h202zM183 328h-138v-28h138v28zM183 378h-138v-28h138v28zM183 428h-138v-27h138v27z";

registerIcon(name, transform, d);

export default {name, transform, d};
