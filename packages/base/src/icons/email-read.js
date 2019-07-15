import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://email-read";
const viewBox = "0 -32 512 512";
const d = "M512 337V0q0-13-9.5-22.5T480-32H32q-14 0-23 9.5T0 0v337l254 143zM464 0L256 154 48 0h416zM328 186l152 135-225 122L32 321l151-135-17-18L32 289V16l223 170L480 18v270L347 168z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
