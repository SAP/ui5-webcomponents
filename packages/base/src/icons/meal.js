import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://meal";
const transform = "translate(175,35)";
const d = "M235 479q10 -1 16 -7t6 -14v-234h-43q0 29 -6.5 42t-15 19.5t-15 10.5t-6.5 15l43 151q5 17 21 17zM214 205h43v-194q0 -17 -6.5 -30t-15.5 -13t-15 13t-6 30v194zM129 319q0 -11 -7 -20t-18 -11q-4 -9 -11 -26.5t-7 -37.5h-42q0 14 -5 31t-9 25l-4 8q-10 2 -17 11t-7 20 l18 151q2 9 9 9q9 -2 9 -11v-138h10l9 140q0 9 8 9q9 0 9 -9l10 -140h9v138q0 9 8 11q8 0 10 -9l17 -140zM43 205h43v-194q0 -17 -6.5 -30t-15.5 -13q-8 0 -14.5 13t-6.5 30v194z";

registerIcon(name, transform, d);

export default {name, transform, d};
