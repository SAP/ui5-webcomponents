import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://expand-group";
const transform = "translate(80.5,35)";
const d = "M394 246q9 9 22.5 9t22.5 -9q10 -10 10 -23t-10 -23l-192 -192q-9 -9 -22.5 -9t-22.5 9l-193 191q-10 10 -10 23t10 22q9 10 22 10t23 -10l159 -157q11 -11 23 0zM394 439q9 9 22.5 9t22.5 -9q10 -10 10 -23t-10 -23l-192 -192q-9 -9 -22.5 -9t-22.5 9l-193 191 q-10 10 -10 23t10 22q9 10 22 10t23 -10l159 -157q5 -5 11.5 -5t11.5 5z";

registerIcon(name, transform, d);

export default {name, transform, d};
