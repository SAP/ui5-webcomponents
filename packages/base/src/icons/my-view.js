import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://my-view";
const viewBox = "0 0 512 512";
const d = "M352 320q0-40-28-68t-68-28-68 28-28 68 28 68 68 28 68-28 28-68zm-96-64q26 0 45 18.5t19 45.5q0 26-19 45t-45 19-45-19-19-45q0-27 19-45.5t45-18.5zm224 224q14 0 23-9.5t9-22.5V128q0-14-9-23t-23-9H32q-14 0-23 9t-9 23v320q0 13 9 22.5t23 9.5h448zM352 128q0 24-5.5 37T332 184t-20.5 7-23.5 1h-64q-11 0-22.5-1t-20.5-7-15-19-6-37h192zm128 320H32V128h96q0 53 25 74t71 22h64q48 0 72-21.5t24-74.5h96v320zM368 64q16 0 16-16 0-6-4.5-11T368 32H144q-6 0-11 5t-5 11q0 7 5 11.5t11 4.5h224z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
