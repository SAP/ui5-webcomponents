import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://folder-blank";
const viewBox = "0 0 512 512";
const d = "M480 448q11 0 18-5t10-11q4-7 4-16V64q0-12-5-18.5T496 36q-7-4-16-4H32q-9 0-16 4-6 3-11 9.5T0 64v384q0 9 4 16 3 6 9.5 11t18.5 5h187l29-32h232zm0-64q-1 9-5 16-3 6-9.5 11t-17.5 5H224l-32 32H64q-12 0-18.5-5T36 432q-4-7-4-16V96q0-13 5-19t11-9q7-4 16-4h384q9 0 16 4 6 3 11 9t5 19v288z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
