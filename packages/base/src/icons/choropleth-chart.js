import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://choropleth-chart";
const viewBox = "0 0 512 512";
const d = "M259.5 225l37 63h183v-63l-32-65-64-96-50-32v119zm-227 35v220h191v-56l-64-104v-37l-37 37h-53v-49l154-47v-55l-63-137-34 31-15 95-46 87zm319 220v-53h-37zm19-77l73 77h36V334l-36 37v-37h-19l-18 37h-36l-37-55h-36v55l36 32h37z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
