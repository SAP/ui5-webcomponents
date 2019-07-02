import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://sound";
const transform = "translate(144.5,35)";
const d = "M288 416q13 0 22.5 -9t9.5 -23v-320q0 -14 -9.5 -23t-22.5 -9q-10 0 -20 7l-107 82q-4 3 -15 5t-17 2h-97q-12 0 -18.5 5t-9.5 11q-4 7 -4 16v128q0 9 4 16q3 6 9.5 11t18.5 5h97q6 0 17 1.5t15 5.5l107 82q10 7 20 7zM288 384l-1 -1l-2 -2l-106 -81q-14 -9 -31.5 -10.5 t-18.5 -1.5h-97v-128h1h96q1 0 18.5 -1.5t31.5 -10.5l106 -81l2 -2l1 -1v320z";

registerIcon(name, transform, d);

export default {name, transform, d};
