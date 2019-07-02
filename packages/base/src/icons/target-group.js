import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://target-group";
const transform = "translate(48.5,35)";
const d = "M224 233q4 0 7.5 -1t6.5 -2l143 145l4 37l63 68v-64h64l-65 -66l-37 -4l-147 -146q0 -2 0.5 -4t0.5 -4q0 -17 -11.5 -29t-28.5 -12t-29 12t-12 29t12 29t29 12zM224 288q-40 0 -68 -28t-28 -68t28 -68t68 -28q19 0 36.5 7.5t31 20.5t21 30.5t7.5 37.5q0 5 -0.5 9t-1.5 9 l25 25q4 -10 6.5 -21t2.5 -22q0 -27 -10 -50t-27.5 -40.5t-41 -27.5t-49.5 -10q-27 0 -50 10t-40.5 27.5t-27.5 40.5t-10 50t10 50t27.5 40.5t40.5 27.5t50 10q23 0 48 -10l-25 -25q-5 1 -11 2t-12 1zM416 307q15 -26 23.5 -54.5t8.5 -60.5q0 -47 -17.5 -87.5t-48 -71 t-71.5 -48t-87 -17.5q-47 0 -87.5 17.5t-71 48t-48 71t-17.5 87.5q0 46 17.5 87t48 71.5t71 48t87.5 17.5q32 0 62.5 -9t56.5 -26l-24 -23q-21 12 -45 19t-50 7q-40 0 -75 -15t-61 -41t-41 -61t-15 -75t15 -75t41 -61t61 -41t75 -15q39 0 74 15t61.5 41t41.5 61t15 75 q0 25 -6.5 48t-17.5 44z";

registerIcon(name, transform, d);

export default {name, transform, d};
