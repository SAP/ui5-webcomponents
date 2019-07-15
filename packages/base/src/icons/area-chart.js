import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://area-chart";
const viewBox = "0 0 512 512";
const d = "M496 65V32H17v449h33V65h446zM237 297L91 232v11l146 129 110-19 149 159V402L347 260zm0-74L91 195v11l146 64 110-37 149 139V250l-149-64zM496 97H91v72l146 28 110-37 149 65V97z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
