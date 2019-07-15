import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://fallback";
const viewBox = "0 -31 512 512";
const d = "M480 417q11 0 18-5t10-11q4-7 4-16v-95h-32q-1 72-5 79-3 6-9.5 11t-17.5 5H224l-32 32H64q-12 0-18.5-5T36 401q-4-7-4-16V65q0-13 5-19t11-9q7-4 112-4V1H32q-9 0-16 4-6 3-11 9.5T0 33v384q0 9 4 16 3 6 9.5 11t18.5 5h188l27-32h233zm0-192q14 0 23-9t9-23V2q0-13-9-22.5T480-30H256q-13 0-22.5 9.5T224 2v191q0 14 9.5 23t22.5 9h224z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
