import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://restart";
const viewBox = "0 -1 512 512";
const d = "M211 159q-6 0-10.5 4t-4.5 11v161q0 7 4.5 11.5T211 351q2 0 8-2l161-83q8-5 8-13.5t-8-13.5l-161-78q-6-2-8-2zm61 319q46 0 87-17.5t71.5-48 48-71.5 17.5-87q0-47-17.5-87.5t-48-71-71.5-48T272 30q-47 0-87.5 17.5t-71 48.5-48 71.5T48 255H16l50 96 46-96H80q0-40 15-75t41-61.5T197 77t75-15 75 15 61 41 41 61 15 75-15 75-41 61-61 41-75 15v32z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
