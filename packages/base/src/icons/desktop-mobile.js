import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://desktop-mobile";
const viewBox = "0 0 512 512";
const d = "M32 192h288v-32H32q-13 0-22.5 9.5T0 192v256q0 14 9.5 23t22.5 9h352q14 0 23-9t9-23V320h-32v128H32V192zm240-64q16 0 16-16 0-6-4.5-11T272 96H144q-6 0-11 5t-5 11q0 7 5 11.5t11 4.5h128zm208 160q13 0 22.5-9t9.5-23V64q0-14-9.5-23T480 32h-96q-14 0-23 9t-9 23v192q0 14 9 23t23 9h96zm0-32h-96V64h96v192z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
