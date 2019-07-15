import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://media-forward";
const viewBox = "0 -1 512 512";
const d = "M480 62q0-13-9.5-22.5T448 30q-14 0-23 9.5T416 62v385q0 14 9 23t23 9q13 0 22.5-9t9.5-23V62zM296 243q11 12 0 23l-98 126q-10 9-10 22.5t10 22.5q9 10 22.5 10t22.5-10l132-160q9-9 9-22.5t-9-22.5L245 72q-9-10-22-10t-23 10q-9 9-9 22.5t9 22.5zm-157 0q5 5 5 11.5t-5 11.5L41 392q-9 9-9 22.5t9 22.5q10 10 23 10t23-10l131-160q10-9 10-22.5T218 232L89 72Q79 62 66 62T43 72q-9 9-9 22.5t9 22.5z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
