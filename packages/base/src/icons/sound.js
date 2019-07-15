import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://sound";
const viewBox = "0 32 512 512";
const d = "M384 480q13 0 22.5-9t9.5-23V128q0-14-9.5-23T384 96q-10 0-20 7l-107 82q-4 3-15 5t-17 2h-97q-12 0-18.5 5t-9.5 11q-4 7-4 16v128q0 9 4 16 3 6 9.5 11t18.5 5h97q6 0 17 1.5t15 5.5l107 82q10 7 20 7zm0-32l-1-1-2-2-106-81q-14-9-31.5-10.5T225 352h-97V224h97q1 0 18.5-1.5T275 212l106-81 2-2 1-1v320z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
