import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://sap-box";
const transform = "translate(80.5,35)";
const d = "M46 144l116 -59v-23l-116 59v23zM46 196l116 -59v-23l-116 58v24zM377 404q5 -3 10 -9l52 -89q4 -5 4 -13v-202q0 -15 -14 -21l-197 -100q-11 -5 -22 0l-197 100q-13 6 -13 21v266q0 14 13 21l197 99q11 6 22 0zM200 173l-44 23q-13 6 -13 21v59l-124 63v-250l181 -93 v177zM157 292q7 -4 10 -10l51 -88q3 -6 3 -12v-193l93 47v194l-45 24q-13 6 -13 21v58l-145 72l-89 -45zM421 286l-42 22q-13 6 -13 22v58l-147 72l-84 -43l134 -67q7 -4 10 -10l53 -89q3 -6 3 -12v-192l86 43v196z";

registerIcon(name, transform, d);

export default {name, transform, d};
