import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://supplier";
const transform = "translate(80.5,35)";
const d = "M320 384q0 -40 -28 -68t-68 -28t-68 28t-28 68t28 68t68 28t68 -28t28 -68zM224 320q27 0 45.5 19t18.5 45t-18.5 45t-45.5 19q-26 0 -45 -19t-19 -45t19 -45t45 -19zM96 128h256v-160h-256v160zM0 80q0 20 14 34t34 14h16v-96h-16q-20 0 -34 14t-14 34zM400 128 q20 0 34 -14t14 -34t-14 -34t-34 -14h-16v96h16zM352 160v32q0 11 -7.5 22.5t-20.5 20.5t-30.5 15t-37.5 6h-64q-20 0 -37.5 -6t-30.5 -15t-20.5 -20.5t-7.5 -22.5v-32h-32q1 35 11.5 59.5t27.5 39.5t40 22t49 7h32h32q27 0 50 -6.5t40.5 -21.5t27.5 -39.5t10 -60.5h-32z M320 192v-32h-96v32h96z";

registerIcon(name, transform, d);

export default {name, transform, d};
