import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://draw-rectangle";
const viewBox = "0 -32 512 512";
const d = "M474.5 407V260h37v-72h-37V42h37v-74h-74V5h-145v-37h-72V5h-145v-37h-74v74h37v146h-37v72h37v147h-37v73h74v-37h145v37h72v-37h145v37h74v-73h-37zm-37 0h-362V42h362v365z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
