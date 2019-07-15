import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://vertical-bar-chart";
const viewBox = "0 0 512 512";
const d = "M232 96q-8 0-8 8v240q0 8 8 8h48q8 0 8-8V104q0-8-8-8h-48zm-128 0q-8 0-8 8v176q0 8 8 8h48q8 0 8-8V104q0-8-8-8h-48zm256 0q-8 0-8 8v368q0 8 8 8h48q8 0 8-8V104q0-8-8-8h-48zM32 64h448V32H32v32z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
