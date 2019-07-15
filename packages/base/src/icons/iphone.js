import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://iphone";
const viewBox = "0 -32 512 512";
const d = "M352 480q26 0 45-19t19-45V32q0-27-19-45.5T352-32H160q-26 0-45 18.5T96 32v384q0 26 19 45t45 19h192zM256 0q10 0 17 6.5t7 17.5q0 10-7 17t-17 7-17-7-7-17q0-11 7-17.5T256 0zm128 416H128V64h256v352z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
