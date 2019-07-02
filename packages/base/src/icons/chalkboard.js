import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://chalkboard";
const transform = "translate(19.5,35)";
const d = "M521 413q16 0 28 -11.5t12 -27.5v-329q0 -17 -12 -31t-28 -14h-480q-17 0 -29 14t-12 31v329q0 16 12 27.5t29 11.5h480zM480 329h-32q-6 -19 -24 -32q-17 -14 -32 -18v-35q29 9 50 29v-145h38v201zM72 244q30 9 50 29v-145h38v201h-31q-6 -19 -23.5 -32t-33.5 -18v-35z M261 128l26 41l26 -41h43l-48 68l44 62h-41l-24 -35l-23 35h-42l45 -63l-47 -67h41zM441 43v41h-160v-41h160z";

registerIcon(name, transform, d);

export default {name, transform, d};
