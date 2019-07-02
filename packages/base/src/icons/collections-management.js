import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://collections-management";
const transform = "translate(47,35)";
const d = "M127 65q3 3 3 -2v-95h-97h-1q-1 0 -1 1v2v1l26 26l-30 30q-28 28 -28 63q0 36 28 62l31 30l5 -4q-21 -26 -21 -57q0 -28 17 -47l40 -38zM486 420q28 -27 28 -63q0 -37 -28 -62l-31 -30l-5 4q22 25 22 57q0 30 -18 47l-40 38l-25 -25q-3 -2 -3 2v92h94q6 0 2 -4l-26 -26z M354 288h-192v96h192v-96zM194 256q14 0 23 -9t9 -23t-9 -23t-23 -9t-23 9t-9 23t9 23t23 9zM322 256q14 0 23 -9t9 -23t-9 -23t-23 -9q-13 0 -22.5 9t-9.5 23t9.5 23t22.5 9zM194 160q14 0 23 -9t9 -23t-9 -23t-23 -9t-23 9t-9 23t9 23t23 9zM322 160q14 0 23 -9t9 -23 t-9 -23t-23 -9q-13 0 -22.5 9t-9.5 23t9.5 23t22.5 9zM354 416h-224v-320h-32v320q0 14 9.5 23t22.5 9h224v-32zM386 352h32v-320q0 -14 -9 -23t-23 -9h-224v32h224v320z";

registerIcon(name, transform, d);

export default {name, transform, d};
