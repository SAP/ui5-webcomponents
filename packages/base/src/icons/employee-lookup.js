import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://employee-lookup";
const viewBox = "0 -32 512 512";
const d = "M512-9l-22-23-82 82q-26-18-56-18-40 0-68 28t-28 68 28 68 68 28 68-28 28-68q0-29-18-55zM352 64q26 0 45 19t19 45q0 27-19 45.5T352 192t-45-18.5-19-45.5q0-26 19-45t45-19zm-96 320q0-40-28-68t-68-28-68 28-28 68 28 68 68 28 68-28 28-68zm-96-64q26 0 45 19t19 45q0 27-19 45.5T160 448t-45-18.5T96 384q0-26 19-45t45-19zm64-192q0-14 5-32H0v64q0 27 10 50t27.5 40.5 41 27.5 49.5 10h64q30 0 56-13t43-35q-15-8-26-18-13 16-31.5 25t-41.5 9h-64q-40 0-68-28t-28-68v-32h192z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
