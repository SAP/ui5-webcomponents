import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://journey-change";
const transform = "translate(80,35)";
const d = "M440 72q9 -10 9 -23t-9 -23l-61 -52q-5 -5 -11 -5t-11 5t-5 11.5t5 11.5l44 36h-351q-16 0 -16 16q0 7 3.5 12.5t4.5 5.5l317 318h-310l43 -36q11 -12 0 -23q-5 -5 -11 -5t-11 5l-60 52q-9 10 -9 23t9 23l60 53q11 11 22 0q11 -12 0 -23l-43 -37h353q6 0 10.5 -4.5 t4.5 -11.5t-3.5 -12.5t-3.5 -6.5l-318 -317h309l-44 37q-5 5 -5 11.5t5 11.5t11 5t11 -5l61 -53v0z";

registerIcon(name, transform, d);

export default {name, transform, d};
