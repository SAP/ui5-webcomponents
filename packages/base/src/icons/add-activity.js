import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://add-activity";
const viewBox = "0 -32 512 512";
const d = "M416 96h96V64h-96v-96h-32v96h-96v32h96v96h32V96zm64 352q13 0 22.5-9.5T512 416V224h-32v192H32V32h192V0H32Q18 0 9 9T0 32v384q0 13 9 22.5t23 9.5h448zM206 334l-89-107-53 54 17 18 36-36 71 89zm-89-234l71 88 18-17-89-107-53 53 17 19zm283 220q16 0 16-16 0-6-4.5-11t-11.5-5H272q-6 0-11 5t-5 11q0 7 5 11.5t11 4.5h128z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
