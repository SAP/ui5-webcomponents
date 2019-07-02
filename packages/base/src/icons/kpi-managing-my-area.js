import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://kpi-managing-my-area";
const transform = "translate(49,35)";
const d = "M372 285l-83 83l27 27l56 -55l110 111l29 -35zM192 160q27 0 50 -10t40.5 -27.5t27.5 -40.5t10 -50v-32h-320v32q0 27 10 50t27.5 40.5t41 27.5t49.5 10h32h32zM288 32q0 40 -28 68t-68 28h-64q-20 0 -37 -7.5t-30.5 -20.5t-21 -30.5t-7.5 -37.5h256zM256 256 q0 -40 -28 -68t-68 -28t-68 28t-28 68t28 68t68 28t68 -28t28 -68zM160 192q27 0 45.5 19t18.5 45q0 27 -18.5 45.5t-45.5 18.5q-26 0 -45 -18.5t-19 -45.5q0 -26 19 -45t45 -19zM463 96q16 0 16 -16q0 -6 -4.5 -11t-11.5 -5h-95q-6 0 -11 5t-5 11q0 7 5 11.5t11 4.5h95z M463 32q16 0 16 -16q0 -6 -4.5 -11t-11.5 -5h-95q-6 0 -11 5t-5 11q0 7 5 11.5t11 4.5h95z";

registerIcon(name, transform, d);

export default {name, transform, d};
