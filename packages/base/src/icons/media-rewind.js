import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://media-rewind";
const viewBox = "0 -1 512 512";
const d = "M32 447q0 14 9.5 23t22.5 9q14 0 23-9t9-23V62q0-13-9-22.5T64 30q-13 0-22.5 9.5T32 62v385zm280-330q9-9 9-22.5T312 72q-10-10-23-10t-22 10L137 232q-9 9-9 22.5t9 22.5l132 160q9 10 22.5 10t22.5-10q10-9 10-22.5T314 392l-98-126q-5-5-5-11.5t5-11.5zm157 0q9-9 9-22.5T469 72q-10-10-23-10t-23 10L294 232q-10 9-10 22.5t10 22.5l131 160q10 10 23 10t23-10q9-9 9-22.5t-9-22.5l-98-126q-5-5-5-11.5t5-11.5z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
