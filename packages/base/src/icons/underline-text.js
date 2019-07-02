import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://underline-text";
const transform = "translate(112.5,35)";
const d = "M368 32q6 0 11 -5q5 -4 5 -11q0 -8 -5 -12q-4 -4 -11 -4h-352q-16 0 -16 16t16 16h352zM176 128q-23 0 -43.5 9t-35.5 24t-24 35.5t-9 43.5v208h32v-208q0 -33 23.5 -56.5t56.5 -23.5h32q34 0 57 23.5t23 56.5v208h32v-208q0 -23 -9 -43.5t-24 -35.5t-35.5 -24t-43.5 -9 h-32z";

registerIcon(name, transform, d);

export default {name, transform, d};
