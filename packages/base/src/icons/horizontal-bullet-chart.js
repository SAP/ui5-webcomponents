import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://horizontal-bullet-chart";
const viewBox = "0 0 512 512";
const d = "M104 224q-8 0-8 8v48q0 8 8 8h240q8 0 8-8v-48q0-8-8-8H104zM32 480h31V32H32v448zm287-160h-31v128h31V320zm-215 32q-8 0-8 8v48q0 8 8 8h143q8 0 8-8v-48q0-8-8-8H104zm344-160h32V64h-32v128zm-63 128h31V192h-31v128zm23-160q8 0 8-8v-48q0-8-8-8H104q-8 0-8 8v48q0 8 8 8h304z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
