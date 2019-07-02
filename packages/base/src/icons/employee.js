import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://employee";
const transform = "translate(112.5,35)";
const d = "M320 352q0 -27 -10 -50t-27.5 -40.5t-41 -27.5t-49.5 -10q-27 0 -50 10t-40.5 27.5t-27.5 40.5t-10 50q0 26 10 49.5t27.5 41t40.5 27.5t50 10q26 0 49.5 -10t41 -27.5t27.5 -41t10 -49.5zM192 256q40 0 68 28t28 68t-28 68t-68 28t-68 -28t-28 -68t28 -68t68 -28z M256 224q26 0 49.5 -10t41 -27.5t27.5 -41t10 -49.5v-128h-384v128q0 26 10 49.5t27.5 41t40.5 27.5t50 10h64h64zM352 96q0 40 -28 68t-68 28h-128q-40 0 -68 -28t-28 -68v-96h320v96zM224 96h96v-32h-96v32z";

registerIcon(name, transform, d);

export default {name, transform, d};
