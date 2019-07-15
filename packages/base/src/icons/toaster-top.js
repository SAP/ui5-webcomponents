import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://toaster-top";
const viewBox = "0 96 512 512";
const d = "M192 384q23 0 41-2t30-11 18.5-28.5T288 288H96q0 35 6.5 54.5T121 371t30 11 41 2zm64 64q0-27-19-45.5T192 384t-45 18.5-19 45.5q0 26 19 45t45 19 45-19 19-45zm240 128q7 0 11.5-5t4.5-11q0-16-16-16h-16V288q0-27-19-45.5T416 224H96q-26 0-45 18.5T32 288v256H16q-16 0-16 16 0 6 4.5 11t11.5 5h480zm-48-32H64V288q0-14 9-23t23-9h320q14 0 23 9t9 23v256zm-48-96q16 0 16-16 0-6-4.5-11t-11.5-5h-96q-6 0-11 5t-5 11q0 7 5 11.5t11 4.5h96zm0 64q16 0 16-16 0-6-4.5-11t-11.5-5h-96q-6 0-11 5t-5 11q0 7 5 11.5t11 4.5h96z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
