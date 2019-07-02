import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://message-popup";
const transform = "translate(48.5,35)";
const d = "M256 238q-6 0 -10 2.5t-6 14.5l-15 113q0 16 9.5 23.5t21.5 7.5t21.5 -7.5t9.5 -23.5l-15 -113q-2 -11 -5.5 -14t-10.5 -3zM256 208q15 0 23.5 -9.5t8.5 -21.5q0 -16 -10 -24t-21.5 -8t-21.5 8t-10 24q0 12 8.5 21.5t22.5 9.5zM448 480q27 0 45.5 -19t18.5 -45v-288 q0 -26 -18.5 -45t-45.5 -19h-32v-75q0 -10 -6.5 -15.5t-14.5 -5.5q-7 0 -12 4l-79 92h-240q-26 0 -45 19t-19 45v288q0 26 19 45t45 19h384zM480 416q0 13 -9 22.5t-23 9.5h-384q-13 0 -22.5 -9.5t-9.5 -22.5v-288q0 -14 9.5 -23t22.5 -9h256l64 -80v80h64q14 0 23 9t9 23 v288z";

registerIcon(name, transform, d);

export default {name, transform, d};
