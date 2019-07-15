import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://browse-folder";
const viewBox = "0 -32 512 512";
const d = "M480 416q11 0 18-5t10-11q4-7 4-16V256h-32v96q-1 9-5 16-3 6-9.5 11t-17.5 5H224l-32 32H64q-12 0-18.5-5T36 400q-4-7-4-16V64q0-13 5-19t11-9q7-4 16-4h160V0H32q-9 0-16 4-6 3-11 9.5T0 32v384q0 9 4 16 3 6 9.5 11t18.5 5h186l30-32h232zM512-9l-22-23-82 82q-26-18-56-18-40 0-68 28t-28 68 28 68 68 28 68-28 28-68q0-29-18-55zM352 64q26 0 45 19t19 45q0 27-19 45.5T352 192t-45-18.5-19-45.5q0-26 19-45t45-19z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
