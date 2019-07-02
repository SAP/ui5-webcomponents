import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://opportunity";
const transform = "translate(48.5,35)";
const d = "M442 192h3q3 -3 3 -4v-2v-186q0 -14 -9 -23t-23 -9h-384q-14 0 -23 9t-9 23v320q0 14 9 23t23 9h192v-32h-192v-212l36 37q-4 8 -4 15q0 14 9 23t23 9t23 -9t9 -23q0 -7 -4 -15l53 -53q8 4 15 4l46 102q-14 10 -14 26q0 14 9 23t23 9t23 -9t9 -23q0 -12 -9 -23l39 -105h2 q9 0 17 -5l104 101h1zM416 145l-68 -66q4 -10 4 -15q0 -14 -9 -23t-23 -9t-23 9t-9 23q0 17 15 27l-39 103q-4 -2 -8 -2q-1 0 -1.5 0.5t-1.5 0.5l-45 -102q7 -4 11.5 -11t4.5 -16q0 -14 -9 -23t-23 -9t-23 9t-9 23q0 9 5 17l-52 52q-8 -5 -17 -5t-17 5l-47 -47v-86h384v145z M335 256l26 79l-67 49h83l26 79l26 -79h83l-68 -49l26 -79l-67 49z";

registerIcon(name, transform, d);

export default {name, transform, d};
