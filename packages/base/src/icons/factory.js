import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://factory";
const transform = "translate(48.5,35)";
const d = "M496 224q6 0 11 -4.5t5 -11.5v-208h-96v120q0 8 -8 8h-48q-8 0 -8 -8v-120h-352v224v144q0 16 16 16h96q6 0 11 -4.5t5 -11.5v-144h368zM480 192h-352h-32v32v128h-64v-128v-192h288v88q0 17 11.5 28.5t28.5 11.5h48q17 0 28.5 -11.5t11.5 -28.5v-88h32v160zM360 256 q-8 0 -8 8v74q0 8 8 8q2 0 4 -1l123 -74q5 -3 3.5 -9t-7.5 -6h-123zM200 256q-8 0 -8 8v74q0 8 8 8q2 0 4 -1l123 -74q5 -3 3.5 -9t-7.5 -6h-123zM8 416q-8 0 -8 4v24q0 4 8 4h112q8 0 8 -4v-24q0 -4 -8 -4h-112zM96 152q0 8 8 8h48q8 0 8 -8v-48q0 -8 -8 -8h-48q-8 0 -8 8 v48zM200 96q-8 0 -8 8v48q0 8 8 8h48q8 0 8 -8v-48q0 -8 -8 -8h-48z";

registerIcon(name, transform, d);

export default {name, transform, d};
