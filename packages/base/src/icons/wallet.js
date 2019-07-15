import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://wallet";
const viewBox = "0 0 512 512";
const d = "M448 288q26 0 45-19t19-45v-32q0-26-19-45t-45-19V64q0-14-9.5-23T416 32H32q-14 0-23 9T0 64v288q0 13 9 22.5t23 9.5h32v64q0 13 9 22.5t23 9.5h128q13 0 22.5-9.5T256 448h96q13 0 22.5-9.5T384 416v-32h32q13 0 22.5-9.5T448 352v-64zm-192 96h96v32h-96v-32zm-160 0h128v64H96v-64zm320-256h-64q-27 0-45.5 19T288 192v32q0 26 18.5 45t45.5 19h64v64H32V64h384v64zm64 96q0 13-9.5 22.5T448 256h-96q-14 0-23-9.5t-9-22.5v-32q0-14 9-23t23-9h96q13 0 22.5 9t9.5 23v32zm-112 0q6 0 11-4.5t5-11.5-5-11.5-11-4.5q-16 0-16 16t16 16z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
