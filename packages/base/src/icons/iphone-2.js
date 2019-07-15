import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://iphone-2";
const viewBox = "0 64 512 512";
const d = "M448 480q26 0 45-18.5t19-45.5V224q0-26-19-45t-45-19H64q-26 0-45 19T0 224v192q0 27 19 45.5T64 480h384zM56 296q10 0 17 7t7 17-7 17-17 7-17-7-7-17 7-17 17-7zm392 152H96V192h352v256z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
