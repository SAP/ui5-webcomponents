import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://calendar";
const viewBox = "0 -32 512 512";
const d = "M325 102h-95v37l95 129h38V139h38v-37h-38V55h-38v47zm-57 37h57v76zm-108 67q-16-10-37-10v38q16 0 26.5 9.5T160 268h38V52h-38v154zm288 242q14 0 23-9.5t9-22.5V0q0-14-9-23t-23-9H64q-14 0-23 9T32 0v416q0 13 9 22.5t23 9.5h64v32h32v-32h192v32h32v-32h64zm-96-64h32v32h-32v-32zm-224 0h32v32h-32v-32zm320-32H64V0h384v352z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
