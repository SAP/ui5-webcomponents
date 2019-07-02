import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://appointment";
const transform = "translate(80.5,35)";
const d = "M416 448q14 0 23 -9t9 -23v-416q0 -14 -9 -23t-23 -9h-384q-13 0 -22.5 9t-9.5 23v416q0 14 9.5 23t22.5 9h64v32h32v-32h192v32h32v-32h64zM320 384h32v32h-32v-32zM96 384h32v32h-32v-32zM416 352h-384v-352h384v352zM96 224q-13 0 -22.5 9t-9.5 23t9.5 23t22.5 9 q14 0 23 -9t9 -23t-9 -23t-23 -9zM224 64q-26 0 -45 19t-19 45t19 45t45 19q27 0 45.5 -19t18.5 -45t-18.5 -45t-45.5 -19zM224 160q-13 0 -22.5 -9t-9.5 -23t9.5 -23t22.5 -9q14 0 23 9t9 23t-9 23t-23 9zM224 224q-13 0 -22.5 9t-9.5 23t9.5 23t22.5 9q14 0 23 -9t9 -23 t-9 -23t-23 -9zM352 96q-13 0 -22.5 9t-9.5 23t9.5 23t22.5 9q14 0 23 -9t9 -23t-9 -23t-23 -9zM352 224q-13 0 -22.5 9t-9.5 23t9.5 23t22.5 9q14 0 23 -9t9 -23t-9 -23t-23 -9zM96 96q-13 0 -22.5 9t-9.5 23t9.5 23t22.5 9q14 0 23 -9t9 -23t-9 -23t-23 -9z";

registerIcon(name, transform, d);

export default {name, transform, d};
