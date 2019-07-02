import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://technical-object";
const transform = "translate(49.5,35)";
const d = "M510 72v-104h-103l-119 128q-20 -17 -43.5 -24.5t-44.5 -7.5q-54 0 -97.5 27t-70.5 69h160q12 0 23 10t20 27t14.5 38t5.5 44q0 22 -5.5 41t-14 33.5t-20 22.5t-23.5 8h-160q27 42 70.5 69t97.5 27q42 0 78.5 -16t64 -43t43.5 -63.5t16 -78.5q0 -22 -5 -42t-13 -39z M478 59l-117 117l-15 15l9 20q15 36 15 68q0 35 -13.5 65.5t-36.5 53.5t-54 36.5t-66 13.5q-54 0 -95 -32h87q19 0 36.5 -10.5t30.5 -29.5t20.5 -44t7.5 -53q0 -27 -7 -53.5t-19.5 -48.5t-30 -35.5t-38.5 -13.5h-87q20 -15 44.5 -23.5t50.5 -8.5q14 0 33 5.5t34 18.5l24 21 l21 -23l109 -118h57v59zM48 192l-48 49v62l47 49h66l47 -48v-63l-48 -49h-64z";

registerIcon(name, transform, d);

export default {name, transform, d};
