import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://error";
const transform = "translate(48.5,35)";
const d = "M256 480q53 0 99.5 -20t81.5 -55t55 -81.5t20 -99.5t-20 -100t-55 -81.5t-81.5 -54.5t-99.5 -20t-100 20t-81.5 54.5t-54.5 81.5t-20 100t20 99.5t54.5 81.5t81.5 55t100 20zM258 353q-13 0 -23.5 -8t-10.5 -25l1 -5t2.5 -18.5t3 -37.5t3.5 -61q0 -11 7 -16t15 -5 q22 0 25 21l1 37l9 85q0 17 -10.5 25t-22.5 8zM258 54q20 0 31 12t11 32q0 19 -11 31t-31 12t-31.5 -12t-11.5 -31q0 -20 11.5 -32t31.5 -12z";

registerIcon(name, transform, d);

export default {name, transform, d};
