import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://toaster-up";
const viewBox = "0 -32 512 512";
const d = "M496 448q16 0 16-16t-16-16h-16V192q0-26-18.5-45T416 128v32q14 0 23 9t9 23v224H64V192q0-14 9.5-23t22.5-9v-32q-26 0-45 19t-19 45v224H16q-6 0-11 4.5T0 432t5 11.5 11 4.5h480zM382 145q11-12 0-23-12-11-23 0l-87 87V-16q0-16-16-16t-16 16v223l-85-85q-5-5-11-5t-11 5q-12 11 0 23l102 101q9 10 22 10t23-10zM208 320q16 0 16-16 0-6-4.5-11t-11.5-5h-96q-6 0-11 5t-5 11q0 7 5 11.5t11 4.5h96zm192 64q16 0 16-16 0-6-4.5-11t-11.5-5H112q-6 0-11 5t-5 11q0 7 5 11.5t11 4.5h288z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
