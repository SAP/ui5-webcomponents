import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://business-objects-mobile";
const viewBox = "0 0 512 512";
const d = "M216 480q8 0 8-8V40q0-8-8-8H40q-8 0-8 8v432q0 8 8 8h176zm256 0q8 0 8-8V296q0-8-8-8H296q-8 0-8 8v176q0 8 8 8h176zm-88-256q40 0 68-28t28-68-28-68-68-28-68 28-28 68 28 68 68 28z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
