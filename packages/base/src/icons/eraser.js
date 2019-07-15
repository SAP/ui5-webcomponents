import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://eraser";
const viewBox = "0 0 512 512";
const d = "M155 64h325V32H116q-7 0-11 4l-69 69q-5 5-5 11.5t5 11.5l326 325q4 4 8 4l110 23-22-110q0-3-1-5t-3-4zm3 140l46-45 223 222h1l-46 46z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
