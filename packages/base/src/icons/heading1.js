import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://heading1";
const viewBox = "0 0 512 512";
const d = "M240 448q16 0 16-16V112q0-16-16-16h-8q-16 0-16 16v144H40V112q0-16-16-16h-8Q0 96 0 112v320q0 16 16 16h8q16 0 16-16V288h176v144q0 16 16 16h8zM448 64h64V32H352v32h56v182l-56-38v37l64 43h32V64z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
