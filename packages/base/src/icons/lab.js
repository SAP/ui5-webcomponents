import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://lab";
const viewBox = "0 -32 512 512";
const d = "M224 192h64l92-134q6-8 2-17t-14-9H144q-11 0-15 9t2 17zM208 64q6 0 11 4.5t5 11.5-5 11.5-11 4.5q-16 0-16-16t16-16zm64 64q-16 0-16-16t16-16q6 0 11 4.5t5 11.5-5 11.5-11 4.5zm201-70q7-10 7-22V2q0-14-9.5-24T446-32H66q-14 0-24 10T32 2v34q0 11 8 22l152 195v195h-16q-16 0-16 16t16 16h16q13 0 22.5-9.5T224 448V252q0-10-7-20L70 44q-6-8-6-19V0h384v25q0 10-7 19L294 232q-6 9-6 20v196q0 13 9 22.5t23 9.5h16q6 0 11-4.5t5-11.5-5-11.5-11-4.5h-16V253z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
