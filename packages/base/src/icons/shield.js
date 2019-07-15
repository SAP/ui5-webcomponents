import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://shield";
const viewBox = "0 -32 512 512";
const d = "M472 431V177q0-49-41-96-16-19-40.5-37t-47-32T304-10.5 286-19l-29-13-30 13q-3 2-28 13.5T144 27q-54 38-78.5 75T41 177v254l216 49zm-36-29l-179 41-180-41V177q0-38 31-72 14-16 36-32.5T187 43t37-21 18-8l15-7 14 7q1 0 25 12t52 31q88 58 88 120v225zm-35-225q0-24-21-47t-47-41-49-29.5T257 47v197h144v-67zM112 374l145 33V244H112v130z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
