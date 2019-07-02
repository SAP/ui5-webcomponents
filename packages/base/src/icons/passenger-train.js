import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://passenger-train";
const transform = "translate(80.5,35)";
const d = "M96 96q-14 0 -23 9.5t-9 22.5v224q0 27 10 50t27.5 40.5t40.5 27.5t50 10h64q26 0 49.5 -10t41 -27.5t27.5 -40.5t10 -50v-224q0 -13 -9 -22.5t-23 -9.5h-256zM96 128h256v224q0 40 -28 68t-68 28h-64q-40 0 -68 -28t-28 -68v-224zM138 65h170l22 -32h-213zM351 1l22 -33 h-298l21 33h255zM160 224q14 0 23 -9t9 -23q0 -13 -9 -22.5t-23 -9.5t-23 9.5t-9 22.5q0 14 9 23t23 9zM288 224q14 0 23 -9t9 -23q0 -13 -9 -22.5t-23 -9.5t-23 9.5t-9 22.5q0 14 9 23t23 9zM256 416q26 0 45 -18.5t19 -45.5v-96h-192v96q0 27 19 45.5t45 18.5h64zM296 352 q0 17 -11.5 28.5t-28.5 11.5h-64q-17 0 -28.5 -11.5t-11.5 -28.5v-72h144v72zM448 -32h-37l-63 96h4q14 0 28 7zM101 64l-64 -96h-37l69 102q12 -6 27 -6h5z";

registerIcon(name, transform, d);

export default {name, transform, d};
