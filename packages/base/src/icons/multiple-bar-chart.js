import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://multiple-bar-chart";
const viewBox = "0 -32 512 512";
const d = "M39.5 329h-38v76h38v-76zm74 0h-36v151h36V329zm38 113h38V329h-38v113zM39.5 29h-38v75h38V29zm74 150V29h-36v150h36zm38-37h38V29h-38v113zm210-113h-38v75h38V29zm74 150V29h-36v150h36zm38-37h38V29h-38v113zM1.5 288h188v-31H1.5v31zm322-288h188v-32h-188V0zM1.5 0h188v-32H1.5V0zm360 329h-38v76h38v-76zm74 0h-36v151h36V329zm38 113h38V329h-38v113zm-150-154h188v-31h-188v31z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
