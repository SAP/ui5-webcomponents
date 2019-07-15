import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://add-activity-2";
const viewBox = "0 -32 512 512";
const d = "M352 384h-67q-3-10-10-20-9-12-26-12H135q-17 0-26 12-7 10-10 20H32V0h192v-32H32q-14 0-23 9T0 0v384q0 13 9 22.5t23 9.5h67q10 26 37 31 8 14 23 23.5t33 9.5 33-9.5 23-23.5q27-5 37-31h67q14 0 23-9.5t9-22.5V256h-32v128zm-112 0q16 0 16 16 0 6-4.5 11t-11.5 5h-16q0 13-9 22.5t-23 9.5-23-9.5-9-22.5h-16q-7 0-11.5-5t-4.5-11q0-16 16-16h96zM512 96V64h-96v-96h-32v96h-96v32h96v96h32V96h96zM240 64q16 0 16-16 0-6-4.5-11T240 32H112q-6 0-11 5t-5 11q0 7 5 11.5t11 4.5h128zm0 64q16 0 16-16 0-6-4.5-11T240 96H112q-6 0-11 5t-5 11q0 7 5 11.5t11 4.5h128zm26 186l22-21-109-131-65 65 21 23 44-44z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
