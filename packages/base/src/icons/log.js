import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://log";
const viewBox = "0 -32 512 512";
const d = "M352 394q57-27 92.5-81T480 192q0-47-17.5-87.5t-48-71-71.5-48T256-32q-47 0-87.5 17.5t-71 48-48 71T32 192q0 67 35.5 121t92.5 81v-36q-43-25-69.5-68.5T64 192q0-40 15-75t41-61 61-41 75-15 75 15 61 41 41 61 15 75q0 54-26.5 97.5T352 358v36zm-96-202q-14 0-23 9t-9 23v224q0 13 9 22.5t23 9.5q13 0 22.5-9.5T288 448V224q0-14-9.5-23t-22.5-9z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
