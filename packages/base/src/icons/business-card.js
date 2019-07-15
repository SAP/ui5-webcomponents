import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://business-card";
const viewBox = "0 32 512 512";
const d = "M480 480q14 0 23-9t9-23V128q0-13-9-22.5T480 96H32q-13 0-22.5 9.5T0 128v320q0 14 9.5 23t22.5 9h448zm0-32H32V128h448v320zM160 256q47 0 71.5-21t24.5-75H64q0 54 24.5 75t71.5 21zm64 64q0-26-19-45t-45-19-45 19-19 45q0 27 19 45.5t45 18.5 45-18.5 19-45.5zm176 0q16 0 16-16 0-6-4.5-11t-11.5-5h-96q-6 0-11 5t-5 11q0 7 5 11.5t11 4.5h96zm0 64q16 0 16-16 0-6-4.5-11t-11.5-5h-96q-6 0-11 5t-5 11q0 7 5 11.5t11 4.5h96z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
