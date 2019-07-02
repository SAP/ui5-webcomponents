import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://choropleth-chart";
const transform = "translate(80.5,35)";
const d = "M227 193l37 63h183v-63l-32 -65l-64 -96l-50 -32v119zM0 228v220h191v-56l-64 -104v-37l-37 37h-53v-49l154 -47v-55l-63 -137l-34 31l-15 95l-46 87zM319 448v-53h-37zM338 371l73 77h36v-146l-36 37v-37h-19l-18 37h-36l-37 -55h-36v55l36 32h37z";

registerIcon(name, transform, d);

export default {name, transform, d};
