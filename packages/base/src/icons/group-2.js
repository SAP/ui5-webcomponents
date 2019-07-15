import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://group-2";
const viewBox = "0 32 512 512";
const d = "M367.5 416q16 0 16-16 0-6-4.5-11t-11.5-5h-224q-6 0-11 5t-5 11q0 7 5 11.5t11 4.5h224zm0-96q16 0 16-16 0-6-4.5-11t-11.5-5h-224q-6 0-11 5t-5 11q0 7 5 11.5t11 4.5h224zm0-96q16 0 16-16 0-6-4.5-11t-11.5-5h-224q-6 0-11 5t-5 11q0 7 5 11.5t11 4.5h224zM-.5 448q0 14 9.5 23t22.5 9h64v-32h-64V128h64V96h-64q-13 0-22.5 9.5T-.5 128v320zm480 32q14 0 23-9t9-23V128q0-13-9-22.5t-23-9.5h-64v32h64v320h-64v32h64z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
