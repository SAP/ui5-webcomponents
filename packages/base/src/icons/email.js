import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://email";
const viewBox = "0 0 512 512";
const d = "M480 416q14 0 23-9t9-23V64q0-13-9-22.5T480 32H32q-13 0-22.5 9.5T0 64v320q0 14 9.5 23t22.5 9h448zM64 384l192-160 192 160H64zm416-16L256 192 32 368V80l133 136 19-18L48 64h416L329 198l17 18L480 80v288z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
