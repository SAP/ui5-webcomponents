import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://sap-box";
const viewBox = "0 -32.5 512 512";
const d = "M80.5 150.5l116-59v-23l-116 59v23zm0 52l116-59v-23l-116 58v24zm331 208q5-3 10-9l52-89q4-5 4-13v-202q0-15-14-21l-197-100q-11-5-22 0l-197 100q-13 6-13 21v266q0 14 13 21l197 99q11 6 22 0zm-177-231l-44 23q-13 6-13 21v59l-124 63v-250l181-93v177zm-43 119q7-4 10-10l51-88q3-6 3-12v-193l93 47v194l-45 24q-13 6-13 21v58l-145 72-89-45zm264-6l-42 22q-13 6-13 22v58l-147 72-84-43 134-67q7-4 10-10l53-89q3-6 3-12v-192l86 43v196z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
