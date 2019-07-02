import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://unwired";
const transform = "translate(48.5,35)";
const d = "M374 394q0 1 1 2t4 1q1 -1 1 -3v-3l-17 -56l-26 -74l-24 -68l-14 -37q-16 -25 -39 -25t-34 15.5t-11 32.5q0 7 5 19q2 4 7.5 11.5t16.5 21.5l45 58l49 62zM256 480q53 0 100 -20t81.5 -55t54.5 -81.5t20 -99.5t-20 -99.5t-54.5 -81.5t-81.5 -55t-100 -20t-99.5 20 t-81.5 55t-55 81.5t-20 99.5t20 99.5t55 81.5t81.5 55t99.5 20zM458 128q22 46 22 96q0 46 -17.5 87t-48 71.5t-71.5 48t-87 17.5t-87 -17.5t-71.5 -48t-48 -71.5t-17.5 -87q0 -50 22 -96h110q15 -23 39 -36t53 -13t53 13t39 36h110z";

registerIcon(name, transform, d);

export default {name, transform, d};
