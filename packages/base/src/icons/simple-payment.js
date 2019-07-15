import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://simple-payment";
const viewBox = "0 -32 512 512";
const d = "M416 480q14 0 23-9t9-23V0q0-13-9-22.5T416-32H96q-14 0-23 9.5T64 0v448q0 14 9 23t23 9h320zm0-32H96V0h320v448zM269 239q42-9 59-31t17-43q0-31-20.5-53.5T269 87V54h-25v32q-26 1-47 20t-25 57l41 5q3-14 12-25t19-15v73q-32 11-51.5 32.5T173 278q0 12 5 25t14.5 24 22.5 18.5 29 8.5v21h25v-21q58-4 70-62l-36-6q-2 12-11 20t-23 9v-76zm0-115q14 4 23.5 14.5T302 161q0 24-33 35v-72zm-25 192q-11-4-18-13t-7-19q0-20 25-32v64z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
