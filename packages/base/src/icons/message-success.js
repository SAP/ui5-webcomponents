import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://message-success";
const transform = "translate(80.5,35)";
const d = "M416 448q13 0 22.5 -9t9.5 -23v-384q0 -13 -9.5 -22.5t-22.5 -9.5h-384q-14 0 -23 9.5t-9 22.5v384q0 14 9 23t23 9h384zM416 416h-384v-384h384v384zM212 96l-113 95l33 47l74 -56l103 170l41 -42z";

registerIcon(name, transform, d);

export default {name, transform, d};
