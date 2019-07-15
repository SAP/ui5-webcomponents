import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://add-coursebook";
const viewBox = "0 -32 512 512";
const d = "M128 96h96V64h-96v-96H96v96H0v32h96v96h32V96zm365 324q8-2 13.5-8.5T512 396V52q0-4-1-8l-2-6-4-5q-1-1-5-1-5 0-13 2-4 1-7 3v333q0 8-5 14.5t-13 8.5l-206 53q-1 0-2 .5t-3 .5q-3 0-9-2l-88-34 244-61q18-5 18-24V-8q0-11-7-17.5T392-32h-4L256 6v33L384 2v318l-256 64V256H96v151q0 17 16 22l129 49q6 2 9 2t5-1z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
