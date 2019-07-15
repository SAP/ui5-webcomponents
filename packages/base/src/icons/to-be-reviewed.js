import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://to-be-reviewed";
const viewBox = "0 -30 512 512";
const d = "M511.5 226l-256-254-254 254 254 255zm-256-199l200 199-200 200-199-200z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
