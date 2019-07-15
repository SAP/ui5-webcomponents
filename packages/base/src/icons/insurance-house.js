import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://insurance-house";
const viewBox = "0 -32 512 512";
const d = "M512 64h-64v-96H256v96h-64l160 160zm-96 32q-17 18-31 32l-22 22-9 10h-4l-10-10q-5-5-10-10.5T319 128q-14-14-31-32V0h32v64h64V0h32v96zM32 0h192v-32H33q-14 0-23.5 9T0 0v352l128 128h224q14 0 23-9.5t9-22.5V303h-32v145H160v-96q0-14-9.5-23t-22.5-9H32V0z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
