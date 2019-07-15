import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://add-folder";
const viewBox = "0 -32 512 512";
const d = "M416 96h96V64h-96v-96h-32v96h-96v32h96v96h32V96zm64 320q11 0 18-5t10-11q4-7 4-16V256h-32v96q-1 9-5 16-3 6-9.5 11t-17.5 5H224l-32 32H64q-12 0-18.5-5T36 400q-4-7-4-16V64q0-13 5-19t11-9q7-4 16-4h161V0H32q-9 0-16 4-6 3-11 9.5T0 32v384q0 9 4 16 3 6 9.5 11t18.5 5h186l30-32h232z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
