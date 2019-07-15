import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://vertical-bullet-chart";
const viewBox = "0 0 512 512";
const d = "M320 385H192v31h128v-31zm88 31q8 0 8-8V104q0-8-8-8h-48q-8 0-8 8v304q0 8 8 8h48zm40 32H320v32h128v-32zm-168-96q8 0 8-8V104q0-8-8-8h-48q-8 0-8 8v240q0 8 8 8h48zM32 63h448V32H32v31zm160 225H64v31h128v-31zm-40-33q8 0 8-8V104q0-8-8-8h-48q-8 0-8 8v143q0 8 8 8h48z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
