import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://response";
const viewBox = "0 -1 512 512";
const d = "M224 350q53 0 99.5-20t81.5-55 55-81.5T480 94V62q0-13-9-22.5T448 30q-13 0-22.5 9.5T416 62v32q0 40-15 75t-41 61-61 41-75 15h-83l74-73q9-9 9-22.5t-9-22.5q-10-10-23-10t-23 10L41 296q-9 9-9 22t9 23l129 128q10 10 23 10t22-10q10-9 10-22t-10-23l-74-74h83z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
