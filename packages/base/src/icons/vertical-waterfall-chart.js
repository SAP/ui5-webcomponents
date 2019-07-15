import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://vertical-waterfall-chart";
const viewBox = "0 -32 512 512";
const d = "M0-32V0h512v-32H0zm416 240h64V48h-64v160zm-64 112V208h-64v112h64zM224 480V320h-64v160h64zm-128 0V48H32v432h64z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
