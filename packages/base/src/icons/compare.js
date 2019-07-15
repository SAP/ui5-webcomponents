import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://compare";
const viewBox = "0 -32 512 512";
const d = "M326 192l47 192h-60q-9-15-23-23V0h112q6 0 11-4.5t5-11.5-5-11.5-11-4.5H114q-16 0-16 16t16 16h112v361q-15 7-24 23h-62l48-192h4q-6-28-27.5-46T114 128t-51 18-28 46h5l47 192h-5q-16 0-16 16t16 16h112q0 26 18.5 45t45.5 19q26 0 45-19t19-45h112q6 0 11-4.5t5-11.5-5-11.5-11-4.5h-7l47-192h4q-5-28-27-46t-51-18-51 18-27 46h4zM124 384h-21L56 192h115zm134 0q13 0 22.5 9t9.5 23-9.5 23-22.5 9q-14 0-23-9t-9-23 9-23 23-9zm85-192h114l-47 192h-20z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
