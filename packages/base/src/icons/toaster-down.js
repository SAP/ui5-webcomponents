import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://toaster-down";
const viewBox = "0 -31 512 512";
const d = "M496 449q16 0 16-16t-16-16h-16V193q0-26-19-45t-45-19v32q14 0 23 9t9 23v224H64V193q0-14 9-23t23-9v-32q-26 0-45 19t-19 45v224H16q-16 0-16 16t16 16h480zM381 81q11 12 0 23-12 11-23 0l-87-87v225q0 16-16 16t-16-16V19l-85 85q-5 5-11 5t-11-5q-12-11 0-23L234-20q9-10 22-10t23 10zM208 321q16 0 16-16 0-6-4.5-11t-11.5-5h-96q-6 0-11 5t-5 11q0 7 5 11.5t11 4.5h96zm192 64q16 0 16-16 0-6-4.5-11t-11.5-5H112q-6 0-11 5t-5 11q0 7 5 11.5t11 4.5h288z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
