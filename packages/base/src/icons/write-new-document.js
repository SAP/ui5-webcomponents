import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://write-new-document";
const viewBox = "0 -32 512 512";
const d = "M32 0h64v-32H33q-14 0-23.5 9T0 0v352l128 128h224q14 0 23-9.5t9-22.5v-96h-32v96H160v-96q0-14-9.5-23t-22.5-9H32V0zm475 282q5-5 5-11t-5-11L247-1q-1-1-17-6t-36-10q-23-7-51-15 9 27 17 49 7 18 12.5 33.5T179 67l261 260q5 5 11 5t11-5zm-97-74l-22 22L206 49l23-22zm63 63l-22 22-41-40 23-23z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
