import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://doctor";
const viewBox = "0 -32 512 512";
const d = "M288 336q0-23-9-43.5T255 257t-35.5-24-43.5-9-43.5 9T97 257t-24 35.5-9 43.5 9 43.5T97 415t35.5 24 43.5 9 43.5-9 35.5-24 24-35.5 9-43.5zm-112-80q34 0 57 23.5t23 56.5-23 56.5-57 23.5q-33 0-56.5-23.5T96 336t23.5-56.5T176 256zm48-32q27 0 50-10t40.5-27.5T342 146t10-50V-32H0V96q0 27 10 50t27.5 40.5 41 27.5 49.5 10h96zm96-128q0 40-28 68t-68 28h-96q-20 0-37-7.5T60.5 164t-21-30.5T32 96V0h288v96zm192 320v-64h-64v-64h-64v64h-64v64h64v64h64v-64h64zM256 96h32V64h-32V32h-32v32h-32v32h32v32h32V96z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
