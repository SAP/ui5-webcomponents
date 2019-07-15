import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://unlocked";
const viewBox = "0 -32 512 512";
const d = "M384 256q26 0 45-19t19-45V32q0-26-19-45t-45-19H128q-27 0-45.5 19T64 32v160q0 18 8.5 32.5T95 247v27l.5 28 .5 22.5V336q0 30 12.5 56t34 45.5 51 31T256 480t62-11.5 51-29.5 34.5-41 12.5-46h-64q0 11-7.5 22.5T324 395t-30.5 15-37.5 6q-40 0-68-23.5T160 336q0-2-.5-14t-.5-26v-26l1-14h224zm32-64q0 14-9.5 23t-22.5 9H128q-14 0-23-9t-9-23V32q0-13 9-22.5T128 0h256q13 0 22.5 9.5T416 32v160zm-111-49q0-15-8-27.5T276 98l44-66H192l43 66q-13 5-21 17.5t-8 27.5q0 20 14.5 34.5T256 192q20 0 34.5-14.5T305 143z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
