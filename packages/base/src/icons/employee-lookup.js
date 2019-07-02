import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://employee-lookup";
const transform = "translate(48.5,35)";
const d = "M512 -9l-22 -23l-82 82q-26 -18 -56 -18q-40 0 -68 28t-28 68t28 68t68 28t68 -28t28 -68q0 -29 -18 -55zM352 64q26 0 45 19t19 45q0 27 -19 45.5t-45 18.5t-45 -18.5t-19 -45.5q0 -26 19 -45t45 -19zM256 384q0 -40 -28 -68t-68 -28t-68 28t-28 68t28 68t68 28t68 -28 t28 -68zM160 320q26 0 45 19t19 45q0 27 -19 45.5t-45 18.5t-45 -18.5t-19 -45.5q0 -26 19 -45t45 -19zM224 128q0 -14 5 -32h-229v64q0 27 10 50t27.5 40.5t41 27.5t49.5 10h32h32q30 0 56 -13t43 -35q-15 -8 -26 -18q-13 16 -31.5 25t-41.5 9h-64q-40 0 -68 -28t-28 -68 v-32h192z";

registerIcon(name, transform, d);

export default {name, transform, d};
