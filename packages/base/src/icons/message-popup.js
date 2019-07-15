import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://message-popup";
const viewBox = "0 -32 512 512";
const d = "M256 238q-6 0-10 2.5t-6 14.5l-15 113q0 16 9.5 23.5T256 399t21.5-7.5T287 368l-15-113q-2-11-5.5-14t-10.5-3zm0-30q15 0 23.5-9.5T288 177q0-16-10-24t-21.5-8-21.5 8-10 24q0 12 8.5 21.5T256 208zm192 272q27 0 45.5-19t18.5-45V128q0-26-18.5-45T448 64h-32v-75q0-10-6.5-15.5T395-32q-7 0-12 4l-79 92H64q-26 0-45 19T0 128v288q0 26 19 45t45 19h384zm32-64q0 13-9 22.5t-23 9.5H64q-13 0-22.5-9.5T32 416V128q0-14 9.5-23T64 96h256l64-80v80h64q14 0 23 9t9 23v288z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
