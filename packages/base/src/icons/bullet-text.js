import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://bullet-text";
const viewBox = "0 -32 512 512";
const d = "M96 480q26 0 45-18.5t19-45.5q0-26-19-45t-45-19-45 19-19 45q0 27 19 45.5T96 480zm0-192q26 0 45-18.5t19-45.5q0-26-19-45t-45-19-45 19-19 45q0 27 19 45.5T96 288zm0-192q26 0 45-18.5T160 32q0-26-19-45T96-32 51-13 32 32q0 27 19 45.5T96 96zm368 319q16 0 16-16 0-6-4.5-11t-11.5-5H273q-6 0-11 5t-5 11q0 7 5 11.5t11 4.5h191zm0-191q16 0 16-16 0-6-4.5-11t-11.5-5H273q-6 0-11 5t-5 11q0 7 5 11.5t11 4.5h191zm0-192q16 0 16-16 0-6-4.5-11T464 0H273q-6 0-11 5t-5 11q0 7 5 11.5t11 4.5h191z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
