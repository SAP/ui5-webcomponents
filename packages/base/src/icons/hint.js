import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://hint";
const viewBox = "0 0 512 512";
const d = "M320 63V32H192v31h33v224h-32v34h95V63h32zm-65 321q-20 0-34 14t-14 34 14 34 34 14 34-14 14-34-14-34-34-14z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
