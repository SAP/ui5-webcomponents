import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://attachment";
const transform = "translate(48.5,35)";
const d = "M483 424q29 -32 29 -70q0 -40 -29 -69l-249 -249q-40 -40 -97 -40q-28 0 -53 11t-43.5 29.5t-29.5 43.5t-11 53q0 57 40 97l222 221l27 -27l-221 -222q-15 -15 -22 -32.5t-7 -35.5q0 -19 7 -37t20 -31.5t31 -22t40 -8.5q40 0 69 29l250 249q17 17 17 41q0 23 -18 41 t-41 18q-25 0 -42 -17l-207 -208q-6 -6 -6 -13q0 -9 6 -14.5t14 -5.5t14 6l179 179l28 -27l-180 -180q-17 -17 -42 -17q-23 0 -40.5 17.5t-17.5 40.5q0 25 17 42l208 208q28 28 68 28q18 0 36.5 -7t33.5 -21z";

registerIcon(name, transform, d);

export default {name, transform, d};
