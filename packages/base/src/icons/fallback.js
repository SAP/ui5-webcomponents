import { registerIcon } from "../SVGIconRegistry.js";

const name = "sap-icon://fallback";
const d = "M480 64q11 0 18 5t10 11q4 7 4 16v95h-32q-1-72-5-79-3-6-9.5-11T448 96H224l-32-32H64q-12 0-18.5 5T36 80q-4 7-4 16v320q0 13 5 19t11 9q7 4 112 4v32H32q-9 0-16-4-6-3-11-9.5T0 448V64q0-9 4-16 3-6 9.5-11T32 32h188l27 32h233zm0 192q14 0 23 9t9 23v191q0 13-9 22.5t-23 9.5H256q-13 0-22.5-9.5T224 479V288q0-14 9.5-23t22.5-9h224z";

registerIcon(name, d);
