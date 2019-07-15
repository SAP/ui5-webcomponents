import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://add-contact";
const viewBox = "0 -32 512 512";
const d = "M64 96q0 54 24 75t72 21 72-21 24-75H64zm160 160q0-26-19-45t-45-19-45 19-19 45q0 27 19 45.5t45 18.5 45-18.5 19-45.5zm80 32q-6 0-11 5t-5 11q0 7 5 11.5t11 4.5h96q16 0 16-16 0-6-4.5-11t-11.5-5h-96zM416 96h96V64h-96v-96h-32v96h-96v32h96v96h32V96zm64 320q14 0 23-9t9-23V224h-32v160H32V64h224V32H32q-13 0-22.5 9.5T0 64v320q0 14 9.5 23t22.5 9h448zM304 224q-6 0-11 5t-5 11q0 7 5 11.5t11 4.5h96q16 0 16-16 0-6-4.5-11t-11.5-5h-96z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
