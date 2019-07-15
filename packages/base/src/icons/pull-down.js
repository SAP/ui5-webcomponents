import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://pull-down";
const viewBox = "0 -32 512 512";
const d = "M471 219q9-10 9-23t-9-22L279-23l-2-1q-1-1-1.5-1t-1.5-1q-2-1-3.5-2t-3.5-2-6-1q-2 0-2.5-.5T256-32q-5 0-11 2-2 1-2.5 1.5T240-27t-2.5 1.5T235-24l-1 1h-1L42 174q-10 9-10 22t10 23q9 9 22 9t23-9L226 78q0 2-.5 7.5t-1 25.5-.5 61.5V288h64l-1-210 139 141q9 9 22 9t23-9zM288 448h-64v32h64v-32zm0-64h-64v32h64v-32zm0-64h-64v32h64v-32z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
