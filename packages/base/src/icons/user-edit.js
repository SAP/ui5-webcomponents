import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://user-edit";
const transform = "translate(49,35)";
const d = "M256 384q0 -40 -28 -68t-68 -28t-68 28t-28 68t28 68t68 28t68 -28t28 -68zM160 320q26 0 45 19t19 45t-19 45t-45 19q-27 0 -45.5 -19t-18.5 -45t18.5 -45t45.5 -19zM151 96h-151v64q0 26 10 49.5t27.5 41t40.5 27.5t50 10h32h32q31 0 57 -14t44 -37l-23 -22 q-13 19 -33.5 30t-44.5 11h-64q-40 0 -68 -28t-28 -68v-32h151zM506 282q5 -5 5 -11t-5 -11l-260 -261q-1 -1 -17 -6t-36 -10q-23 -7 -51 -15q9 27 17 49q7 18 12.5 33.5t6.5 16.5l261 260q5 5 11 5t11 -5zM409 208l-22 22l-182 -181l23 -22zM472 271l-22 22l-41 -40l23 -23 z";

registerIcon(name, transform, d);

export default {name, transform, d};
