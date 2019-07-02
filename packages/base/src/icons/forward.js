import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://forward";
const transform = "translate(80.5,35)";
const d = "M440 310q9 -10 9 -23t-9 -22l-128 -128q-10 -10 -23 -10t-23 10q-9 9 -9 22.5t9 22.5l74 73h-84q-40 0 -75 -15t-61 -41t-41 -61t-15 -75v-32q0 -13 -9 -22.5t-23 -9.5q-13 0 -22.5 9.5t-9.5 22.5v32q0 53 20.5 99.5t55 81.5t81 55t99.5 20h84l-74 74q-10 10 -10 23 t10 22q9 10 22 10t23 -10z";

registerIcon(name, transform, d);

export default {name, transform, d};
