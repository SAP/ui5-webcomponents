import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://resize";
const transform = "translate(48.5,35)";
const d = "M480 480q14 0 23 -9.5t9 -23.5v-143q0 -16 -16 -18q-6 1 -11 5.5t-5 11.5v120l-420 -418l-5 -5h121q14 0 16 -14q0 -16 -16 -18h-144q-14 0 -23 9.5t-9 23.5v141q0 16 16 18q6 -1 11 -5.5t5 -11.5v-120q1 2 4 5l423 420h-123q-14 0 -16 14q0 16 16 18h144zM448 192h32 v-160q0 -13 -9 -22.5t-23 -9.5h-160v32h160v160zM64 256h-32v160q0 14 9.5 23t22.5 9h160v-32h-160v-160z";

registerIcon(name, transform, d);

export default {name, transform, d};
