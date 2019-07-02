import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://save";
const transform = "translate(80.5,35)";
const d = "M394 448q22 0 38 -15.5t16 -38.5v-340q0 -23 -16 -38.5t-38 -15.5h-106h-128h-43q-6 0 -13 5l-99 100q-5 4 -5 12v277q0 23 15.5 38.5t38.5 15.5h74h192h74zM128 416v-128h192v128h-192zM288 32v128h-128v-128h128zM416 394q0 9 -6.5 15.5t-15.5 6.5h-42v-128 q0 -14 -9.5 -23t-22.5 -9h-192q-14 0 -23 9t-9 23v128h-42q-9 0 -15.5 -6.5t-6.5 -15.5v-271l91 -91h5v128q0 14 9 23t23 9h128q13 0 22.5 -9t9.5 -23v-128h74q9 0 15.5 6.5t6.5 15.5v340zM216 144q8 0 8 -8v-48q0 -8 -8 -8h-17q-7 0 -7 8v48q0 8 7 8h17z";

registerIcon(name, transform, d);

export default {name, transform, d};
