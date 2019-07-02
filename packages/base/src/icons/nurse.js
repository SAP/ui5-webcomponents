import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://nurse";
const transform = "translate(48.5,35)";
const d = "M224 96h32v-32h-32v-32h-32v32h-32v32h32v32h32v-32zM512 416v-64h-64v-64h-64v64h-64v64h64v64h64v-64h64zM192 192q26 0 49.5 -10t41 -27.5t27.5 -41t10 -49.5v-96h-320v96q0 26 10 49.5t27.5 41t40.5 27.5t50 10h32h32zM288 64q0 40 -28 68t-68 28h-64q-40 0 -68 -28 t-28 -68v-64h256v64zM256 288q0 -40 -28 -68t-68 -28t-68 28t-28 68q0 21 8.5 38.5t22.5 31.5q-3 2 -5 5l-19 26l-2 2l-1 2q-9 17 1 35q13 20 40 20h101q28 0 41 -20q10 -18 1 -35l-1 -2l-2 -2l-19 -26q-2 -2 -2.5 -3t-2.5 -2q14 -14 22.5 -31.5t8.5 -38.5zM109 416 q-6 0 -10.5 -2.5t-2.5 -5.5l21 -27q2 -5 13 -5h60q11 0 13 5l20 27q2 3 -2 5.5t-11 2.5h-101zM160 224q26 0 45 19t19 45q0 18 -9.5 33t-24.5 23h-60h-1q-14 -8 -23.5 -23t-9.5 -33q0 -26 19 -45t45 -19z";

registerIcon(name, transform, d);

export default {name, transform, d};
