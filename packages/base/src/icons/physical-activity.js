import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://physical-activity";
const transform = "translate(65.5,35)";
const d = "M376 389q-23 0 -34 13.5t-11 32.5t11 32t34 13q18 0 31.5 -13t13.5 -32t-13.5 -32.5t-31.5 -13.5zM457 262q19 0 19 -19q0 -7 -5 -13t-14 -6h-72q-15 0 -22 15l-16 32l28 49l28 -58h54zM164 186l39 -39l-31 -53q-7 -13 -26 -15h-117q-28 0 -28 27t28 27h103zM340 122 q8 -8 8 -22q0 -9 -4 -18l-51 -96q-5 -9 -12.5 -13t-12.5 -4q-11 0 -20.5 8t-9.5 20q0 9 4 13l45 80l-113 113l76 124l-146 -33q-1 -1 -6 -1q-10 0 -17 4.5t-7 18.5q0 15 18 20l211 51q8 2 12 2q22 0 35 -18l5 -8l10 -22l-91 -154z";

registerIcon(name, transform, d);

export default {name, transform, d};
