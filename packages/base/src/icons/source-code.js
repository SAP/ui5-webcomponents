import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://source-code";
const transform = "translate(47.5,35)";
const d = "M51 231q-8 -10 0 -19l139 -151q3 -5 3 -11q0 -10 -6 -14q-5 -4 -11 -4q-8 0 -15 7l-157 173q-9 9 0 19l157 178q7 7 15 7q17 0 17 -18q0 -7 -3 -11zM509 231q9 -10 0 -19l-157 -173q-7 -7 -15 -7q-6 0 -11 4q-6 4 -6 14q0 7 4 11l139 151q6 9 0 19l-139 156q-4 4 -4 11 q0 18 17 18q8 0 15 -7z";

registerIcon(name, transform, d);

export default {name, transform, d};
