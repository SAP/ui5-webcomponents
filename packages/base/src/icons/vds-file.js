import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://vds-file";
const viewBox = "0 -32 512 512";
const d = "M352 64h32V0q0-14-9-23t-23-9H32q-14 0-23 9T0 0v352l128 128h224q13 0 22.5-9t9.5-23v-64h-32v64H160v-96q0-14-9.5-23t-23.5-9H32V0h320v64zm6 256q43 0 85.5-23.5T512 225q-26-48-68.5-72T358 128h-1q-43 0-85 24t-68 72q26 48 68.5 72t85.5 24zm-1-160q28 1 60.5 15.5T474 225q-24 35-56.5 49T358 288t-59.5-14.5T242 224q20-29 50.5-46.5T357 160zm1 109q19 0 32-13t13-32q0-18-13-31t-32-13-32 13-13 31q0 19 13 32t32 13z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
