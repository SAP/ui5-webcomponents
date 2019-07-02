import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://electronic-medical-record";
const transform = "translate(48.5,35)";
const d = "M512 416v-64h-64v-64h-64v64h-64v64h64v64h64v-64h64zM239 118l19 34q3 5 9 7h8q7 0 10 -6l31 -40l20 13q4 3 10 3q7 0 10 -4l24 -22q4 -6 4 -9q0 -13 -16 -13q-7 0 -12 4l-13 14l-22 -15q-5 -3 -12 -3q-6 1 -11 6l-23 33l-12 -19q-6 -7 -12 -7l-25 -3l-18 -52 q-4 -7 -15 -7q-10 1 -11.5 11.5t-1.5 18.5l-3 9l-12 94l-24 -76q-3 -8 -10 -9l-6 -1q-7 0 -12 4l-10 12l-12 -12q-4 -4 -12 -4q-6 0 -10.5 3.5t-4.5 8.5q0 6 4 10l23 21q5 5 12 5t10 -5l5 -3l42 159q3 10 15 10q14 0 17 -12l14 -162q1 1 6 1zM416 224h32v-224 q0 -13 -9.5 -22.5t-22.5 -9.5h-384q-14 0 -23 9.5t-9 22.5v320q0 14 9 23t23 9h224v-32h-224v-320h384v224z";

registerIcon(name, transform, d);

export default {name, transform, d};
