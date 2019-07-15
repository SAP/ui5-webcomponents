import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://warning2";
const viewBox = "0 -31 512 512";
const d = "M511 225L256-30 1 225l255 254zM256 25l199 200-199 199L56 225zm0 168q-6 0-10 2.5t-6 14.5l-15 109q0 14 8.5 23t22.5 9 22.5-9 8.5-23l-15-109q-2-11-5.5-14t-10.5-3zm31-59q0-14-8.5-23t-22.5-9-22.5 9-8.5 23q0 12 8.5 21.5T256 165t22.5-9.5T287 134z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
