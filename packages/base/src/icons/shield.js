import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://shield";
const transform = "translate(88.5,35)";
const d = "M432 431v-254q0 -49 -41 -96q-16 -19 -40.5 -37t-47 -32t-39.5 -22.5t-18 -8.5l-29 -13l-30 13q-3 2 -28 13.5t-55 32.5q-54 38 -78.5 75t-24.5 75v254l216 49zM396 402l-179 41l-180 -41v-225q0 -38 31 -72q14 -16 36 -32.5t43 -29.5t37 -21t18 -8l15 -7l14 7q1 0 25 12 t52 31q88 58 88 120v225zM361 177q0 -24 -21 -47t-47 -41t-49 -29.5t-27 -12.5v197h144v-67zM72 374l145 33v-163h-145v130z";

registerIcon(name, transform, d);

export default {name, transform, d};
