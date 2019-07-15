import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://pdf-attachment";
const viewBox = "0 -32 512 512";
const d = "M449.5 195q22 0 42-11t20-26q0-23-34-23-18 0-41.5 5.5T396.5 155q-32-7-57.5-13t-42.5-11q-33-51-54-51l-7 1q-21 7-21 26 0 17 30 37l31 12q28 45 42 89-7 7-9 22t-2 25q0 22 7 37.5t21 15.5q11 0 17.5-12t6.5-36q0-10-1.5-22t-5.5-26q26-48 50-63l31 7q10 2 17 2zm-86-17q-14 13-24 30l-21-40zm21-130V0q0-14-9-23t-23-9h-320q-14 0-23 9T.5 0v352l128 128h224q13 0 22.5-9t9.5-23v-64h-32v64h-192v-96q0-14-9.5-23t-23.5-9h-95V0h320v48h32z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
