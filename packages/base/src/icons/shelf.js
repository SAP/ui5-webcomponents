import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://shelf";
const viewBox = "0 -32 512 512";
const d = "M416 480q13 0 22.5-9t9.5-23V-32h-32v96H96v-96H64v480q0 14 9 23t23 9h320zM96 352h320v96H96v-96zm320-160H96V96h320v96zm0 32v96H96v-96h320zM304 416q16 0 16-16t-16-16h-96q-16 0-16 16t16 16h96zm-96-288q-16 0-16 16t16 16h96q16 0 16-16t-16-16h-96zm96 160q16 0 16-16t-16-16h-96q-16 0-16 16t16 16h96z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
