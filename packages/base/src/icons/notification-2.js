import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://notification-2";
const viewBox = "0 0 512 512";
const d = "M368 384q16 0 16-16 0-6-4.5-11t-11.5-5H144q-6 0-11 5t-5 11q0 7 5 11.5t11 4.5h224zm0-96q16 0 16-16 0-6-4.5-11t-11.5-5H144q-6 0-11 5t-5 11q0 7 5 11.5t11 4.5h224zm80 192q27 0 45.5-19t18.5-45V192q0-26-18.5-45T448 128h-32V53q0-10-6.5-15.5T395 32q-7 0-12 4l-79 92H64q-26 0-45 19T0 192v224q0 26 19 45t45 19h384zm32-64q0 13-9 22.5t-23 9.5H64q-13 0-22.5-9.5T32 416V192q0-14 9.5-23t22.5-9h256l64-80v80h64q14 0 23 9t9 23v224z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
