import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://message-information";
const transform = "translate(80.5,35)";
const d = "M416 448q13 0 22.5 -9t9.5 -22v-384q0 -14 -9.5 -23.5t-22.5 -9.5h-384q-14 0 -23 9.5t-9 23.5v384q0 13 9 22t23 9h384zM416 417h-384v-384h384v384zM288 64h-128v33h33v128h-32v31h95v-159h32v-33zM224 289q-14 0 -23 9t-9 22q0 14 9 23.5t23 9.5q13 0 22.5 -9.5 t9.5 -23.5q0 -13 -9.5 -22t-22.5 -9z";

registerIcon(name, transform, d);

export default {name, transform, d};
