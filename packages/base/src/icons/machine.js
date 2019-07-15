import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://machine";
const viewBox = "0 -48 512 512";
const d = "M32 167H0v160l192 128h96v-96l128-68v-60H288V103H32v64zm0 32h32v-64h192v128h128v9l-111 59-17 9v83h-55L32 310V199zM448 71q26 0 45-19t19-45-19-45-45-19H0v32h448q13 0 22.5 9.5T480 7q0 14-9.5 23T448 39H0v32h448zm-128 32v96h96v-96h-96z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
