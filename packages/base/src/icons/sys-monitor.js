import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://sys-monitor";
const viewBox = "0 0 512 512";
const d = "M480 480q14 0 23-9t9-23V128q0-13-9-22.5T480 96H32q-13 0-22.5 9.5T0 128v320q0 14 9.5 23t22.5 9h448zm0-32H32V128h448v320zM368 64q16 0 16-16 0-6-4.5-11T368 32H144q-6 0-11 5t-5 11q0 7 5 11.5t11 4.5h224z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
