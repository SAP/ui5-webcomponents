import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://resize";
const viewBox = "0 -32 512 512";
const d = "M480 480q14 0 23-9.5t9-23.5V304q0-16-16-18-6 1-11 5.5t-5 11.5v120L60 5l-5-5h121q14 0 16-14 0-16-16-18H32q-14 0-23 9.5T0 1v141q0 16 16 18 6-1 11-5.5t5-11.5V23q1 2 4 5l423 420H336q-14 0-16 14 0 16 16 18h144zm-32-288h32V32q0-13-9-22.5T448 0H288v32h160v160zM64 256H32v160q0 14 9.5 23t22.5 9h160v-32H64V256z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
