import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://expand-group";
const viewBox = "0 -1 512 512";
const d = "M425.5 277q9 9 22.5 9t22.5-9q10-10 10-23t-10-23l-192-192q-9-9-22.5-9t-22.5 9l-193 191q-10 10-10 23t10 22q9 10 22 10t23-10l159-157q11-11 23 0zm0 193q9 9 22.5 9t22.5-9q10-10 10-23t-10-23l-192-192q-9-9-22.5-9t-22.5 9l-193 191q-10 10-10 23t10 22q9 10 22 10t23-10l159-157q5-5 11.5-5t11.5 5z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
