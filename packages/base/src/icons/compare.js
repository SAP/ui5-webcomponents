import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://compare";
const transform = "translate(80.5,35)";
const d = "M292 192l47 192h-60q-9 -15 -23 -23v-361h112q6 0 11 -4.5t5 -11.5t-5 -11.5t-11 -4.5h-288q-16 0 -16 16t16 16h112v361q-15 7 -24 23h-62l48 -192h4q-6 -28 -27.5 -46t-50.5 -18t-51 18t-28 46h5l47 192h-5q-16 0 -16 16t16 16h112q0 26 18.5 45t45.5 19q26 0 45 -19 t19 -45h112q6 0 11 -4.5t5 -11.5t-5 -11.5t-11 -4.5h-7l47 -192h4q-5 -28 -27 -46t-51 -18t-51 18t-27 46h4zM90 384h-21l-47 -192h115zM224 384q13 0 22.5 9t9.5 23t-9.5 23t-22.5 9q-14 0 -23 -9t-9 -23t9 -23t23 -9zM309 192h114l-47 192h-20z";

registerIcon(name, transform, d);

export default {name, transform, d};
