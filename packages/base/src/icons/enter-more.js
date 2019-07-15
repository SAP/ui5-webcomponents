import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://enter-more";
const viewBox = "0 -32 512 512";
const d = "M288 256q13 0 22.5-9t9.5-23V0q0-13-9.5-22.5T288-32H32q-14 0-23 9.5T0 0v224q0 14 9 23t23 9h256zm0-32H32V0h256v224zm215 168q9-10 9-23t-9-23l-92-86q-5-5-11-5t-11 5-5 11.5 5 11.5l75 69H273q-16 0-16 16t16 16h191l-75 68q-5 5-5 11.5t5 11.5 11 5 11-5z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
