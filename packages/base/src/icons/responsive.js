import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://responsive";
const viewBox = "0 0 512 512";
const d = "M480 288q13 0 22.5-9t9.5-23V64q0-14-9.5-23T480 32h-96q-14 0-23 9t-9 23v192q0 14 9 23t23 9h96zm0-224v192h-96V64h96zm-240 0q6 0 11-4.5t5-11.5q0-6-5-11t-11-5h-96q-7 0-11.5 5T128 48q0 16 16 16h96zm-80 384V256h128v-32H160q-14 0-23 9t-9 23v192q0 14 9 23t23 9h256q13 0 22.5-9t9.5-23V320h-32v128H160zm-64-64v-32H32V128h288V96H32q-14 0-23 9.5T0 128v224q0 14 9 23t23 9h64z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
