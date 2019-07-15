import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://discussion";
const viewBox = "0 -32 512 512";
const d = "M448 288q26 0 45-19t19-45v-96q0-27-19-45.5T448 64v-76q0-9-6.5-14.5T427-32t-13 4l-78 91-48 1q-26 0-45 18.5T224 128v96q0 26 19 45t45 19h160zm32-64q0 13-9.5 22.5T448 256H288q-14 0-23-9.5t-9-22.5v-96q0-14 9-23t23-9l64-1 64-79v80h32q13 0 22.5 9t9.5 23v96zm-320 63l57 1q-13-14-19-33h-22l-78-91q-5-4-13-4t-14.5 5.5T64 180v76q-26 0-45 18.5T0 320v96q0 26 19 45t45 19h160q26 0 45-19t19-45v-96q-9 0-17.5-2t-16.5-5q2 4 2 7v96q0 13-9.5 22.5T224 448H64q-14 0-23-9.5T32 416v-96q0-14 9-23t23-9h32v-80z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
