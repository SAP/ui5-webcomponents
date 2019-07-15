import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://down";
const viewBox = "0 0 512 512";
const d = "M0 480h512L256 32zm64-32L256 96l192 352H64z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
