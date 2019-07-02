import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://multiple-bar-chart";
const transform = "translate(49,35)";
const d = "M39 329h-38v76h38v-76zM113 329h-36v151h36v-151zM151 442h38v-113h-38v113zM39 29h-38v75h38v-75zM113 179v-150h-36v150h36zM151 142h38v-113h-38v113zM361 29h-38v75h38v-75zM435 179v-150h-36v150h36zM473 142h38v-113h-38v113zM1 288h188v-31h-188v31zM323 0h188 v-32h-188v32zM1 0h188v-32h-188v32zM361 329h-38v76h38v-76zM435 329h-36v151h36v-151zM473 442h38v-113h-38v113zM323 288h188v-31h-188v31z";

registerIcon(name, transform, d);

export default {name, transform, d};
