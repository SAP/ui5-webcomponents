import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://pie-chart";
const viewBox = "0 -39 530 530";
const d = "M515 308q15-45 15-93 0-101-66-178l-16 14-157 158zm-38 30l-201-89v241q71-5 129.5-43.5T497 347zM276 165L419 22q-63-53-143-60-12-1-22-1t-21 1q-64 5-117.5 40.5T31 94q-10 18-17 38-14 40-14 83 0 94 60 166 15 16 30 29 62 52 143 60V207z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
