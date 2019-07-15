import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://video";
const viewBox = "0 32 512 512";
const d = "M480 480q13 0 22.5-9t9.5-23V128q0-14-9.5-23T480 96q-9 0-16 4L352 220v-28q0-27-19-45.5T288 128H64q-26 0-45 18.5T0 192v192q0 26 19 45t45 19h224q26 0 45-19t19-45v-29l112 120q8 5 16 5zm-160-96q0 13-9 22.5t-23 9.5H64q-14 0-23-9.5T32 384V192q0-14 9-23t23-9h224q14 0 23 9t9 23v192zm160 64L352 314v-53l128-133v320z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
