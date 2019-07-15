import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://documents";
const viewBox = "0 -32 512 512";
const d = "M448 384q13 0 22.5-9t9.5-23V0q0-14-9-23t-23-9H160q-14 0-23 9t-9 23v288l96 96h224zm0-32H256v-64q0-14-9.5-23t-23.5-9h-63V0h288v352zM64 64H32v384q0 14 9.5 23t22.5 9h288v-32H64V64zm320 64H224v32h160v-32zm0-64H224v32h160V64z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
