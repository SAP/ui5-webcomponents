import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://education";
const viewBox = "0 0 512 512";
const d = "M96 449q0 11-9 19.5T71 479h82q11 0 24.5-10.5T192 447V255l-48 63-48-63v194zm382 30q16 0 25-10t9-26V95q0-14-9.5-23T480 63H326q-22 0-42-12t-28-19q-3 3-11.5 8.5T225 51t-23 8.5-23 3.5H32Q0 63 0 95v352q0 11 7.5 21.5T32 479h11q7-2 13-12.5t8-19.5H32V127h162q10 0 18-4t14-9.5 9.5-10.5 6.5-8v320q-1 11-9.5 21.5T212 447q0 5-3 11t-7.5 10.5-8.5 7.5-5 3q27 0 43.5-9t20.5-17q5 8 18 17t39 9h169zm2-32H302q-18 0-23.5-12.5T272 414l-1-319q3 3 6 8t8 10.5 11 9.5 15 4h169v320z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
