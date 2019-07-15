import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://full-screen";
const viewBox = "0 -32 512 512";
const d = "M480 480q14 0 23-9.5t9-23.5V304q0-16-16-18-6 1-11 5.5t-5 11.5v120L350 291q-12-10-24-1-10 14 0 24l126 134H336q-14 0-16 14 0 16 16 18h144zM176 0q14 0 16-14 0-16-16-18H32q-14 0-23 9.5T0 1v141q0 16 16 18 6-1 11-5.5t5-11.5V25l130 132q12 10 24 1 10-14 0-24L53 0h123zm272 224h32V32q0-13-9-22.5T448 0H256v32h192v192zm-384 0H32v192q0 14 9.5 23t22.5 9h192v-32H64V224z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
