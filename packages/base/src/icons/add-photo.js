import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://add-photo";
const viewBox = "0 -32 512 512";
const d = "M448 272q0-7-5-11.5t-11-4.5q-16 0-16 16t16 16q6 0 11-4.5t5-11.5zM416 96h96V64h-96v-96h-32v96h-96v32h96v96h32V96zm64 256q9 0 16-4 6-3 11-8.5t5-16.5v-99h-32v96h-88l-7 22q-8 25-19.5 46T346 416H165q-7-7-19-28t-20-46l-7-22H32V32h224V0H32Q18 0 9 10T0 32v291q0 12 9 20.5t23 8.5h64q4 14 11.5 31t16.5 31 18.5 24 17.5 10h192q8 0 17-9.5t18-24 16.5-31.5 12.5-31h64zm-224-64q-40 0-68-28t-28-68 28-68 68-28V64q-27 0-50 10t-40.5 27.5T138 142t-10 50 10 50 27.5 40.5T206 310t50 10q45 0 78.5-27t44.5-69h-33q-11 28-35 46t-55 18z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
