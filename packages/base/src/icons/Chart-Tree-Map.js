import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://Chart-Tree-Map";
const viewBox = "0 0 512 512";
const d = "M216 480q8 0 8-8V40q0-8-8-8H40q-8 0-8 8v432q0 8 8 8h176zm256 0q8 0 8-8V296q0-8-8-8H264q-8 0-8 8v176q0 8 8 8h208zm0-224q8 0 8-8v-80q0-8-8-8h-80q-8 0-8 8v80q0 8 8 8h80zm0-128q8 0 8-8V40q0-8-8-8h-80q-8 0-8 8v80q0 8 8 8h80zM344 256q8 0 8-8V40q0-8-8-8h-80q-8 0-8 8v208q0 8 8 8h80z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
