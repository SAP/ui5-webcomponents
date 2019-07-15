import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://doc-attachment";
const viewBox = "0 -32 512 512";
const d = "M511 335l-55-220h-37l-53 165-55-165h-37l-55 220h37l37-165 54 165h36l55-165 36 165h37zM385 48V0q0-14-9-23t-23-9H33q-14 0-23 9T1 0v352l128 128h224q13 0 22.5-9t9.5-23v-64h-32v64H161v-96q0-14-9.5-23t-23.5-9H33V0h320v48h32z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
