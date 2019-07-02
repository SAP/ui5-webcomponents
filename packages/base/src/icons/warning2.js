import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://warning2";
const transform = "translate(49.5,35)";
const d = "M510 224l-255 -255l-255 255l255 254zM255 24l199 200l-199 199l-200 -199zM255 192q-6 0 -10 2.5t-6 14.5l-15 109q0 14 8.5 23t22.5 9t22.5 -9t8.5 -23l-15 -109q-2 -11 -5.5 -14t-10.5 -3zM286 133q0 -14 -8.5 -23t-22.5 -9t-22.5 9t-8.5 23q0 12 8.5 21.5t22.5 9.5 t22.5 -9.5t8.5 -21.5z";

registerIcon(name, transform, d);

export default {name, transform, d};
