import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://response";
const transform = "translate(80.5,35)";
const d = "M192 319q53 0 99.5 -20t81.5 -55t55 -81.5t20 -99.5v-32q0 -13 -9 -22.5t-23 -9.5q-13 0 -22.5 9.5t-9.5 22.5v32q0 40 -15 75t-41 61t-61 41t-75 15h-83l74 -73q9 -9 9 -22.5t-9 -22.5q-10 -10 -23 -10t-23 10l-128 128q-9 9 -9 22t9 23l129 128q10 10 23 10t22 -10 q10 -9 10 -22t-10 -23l-74 -74h83v0z";

registerIcon(name, transform, d);

export default {name, transform, d};
