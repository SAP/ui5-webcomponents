import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://letter";
const viewBox = "0 32 512 512";
const d = "M480 480q14 0 23-9t9-23V128q0-13-9-22.5T480 96H32q-13 0-22.5 9.5T0 128v320q0 14 9.5 23t22.5 9h448zm0-32H32V128h448v320zm-32-80v32q0 16-16 16h-32q-16 0-16-16v-32q0-6 4.5-11t11.5-5h32q7 0 11.5 5t4.5 11zm-176-48q16 0 16-16 0-6-4.5-11t-11.5-5H112q-6 0-11 5t-5 11q0 7 5 11.5t11 4.5h160zm-96-64q16 0 16-16 0-6-4.5-11t-11.5-5h-64q-6 0-11 5t-5 11q0 7 5 11.5t11 4.5h64z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
