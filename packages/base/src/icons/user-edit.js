import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://user-edit";
const viewBox = "0 -32 512 512";
const d = "M256.5 384q0-40-28-68t-68-28-68 28-28 68 28 68 68 28 68-28 28-68zm-96-64q26 0 45 19t19 45-19 45-45 19q-27 0-45.5-19t-18.5-45 18.5-45 45.5-19zm-9-224H.5v64q0 26 10 49.5t27.5 41T78.5 278t50 10h64q31 0 57-14t44-37l-23-22q-13 19-33.5 30t-44.5 11h-64q-40 0-68-28t-28-68v-32h151zm355 186q5-5 5-11t-5-11L246.5-1q-1-1-17-6t-36-10q-23-7-51-15 9 27 17 49 7 18 12.5 33.5t6.5 16.5l261 260q5 5 11 5t11-5zm-97-74l-22 22-182-181 23-22zm63 63l-22 22-41-40 23-23z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
