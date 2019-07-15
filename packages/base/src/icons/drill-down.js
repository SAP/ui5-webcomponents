import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://drill-down";
const viewBox = "0 -31 512 512";
const d = "M394 154q11 9 23 9.5t22-9.5q9-9 9-22.5t-9-22.5L279-20q-9-10-22.5-10T234-20L74 111q-10 9-10 22.5T74 156q9 10 21.5 9.5T119 156l126-97q5-5 11.5-5t11.5 5zm-22 146q21 17 38 0 8-8 8-18.5t-8-18.5L275 154q-8-8-19-8t-19 8L103 264q-8 8-8 19t8 19 18.5 8 19.5-8l106-82q4-4 9.5-4t9.5 4zm-11 140q18 15 33 0 7-7 7-16.5t-7-16.5l-120-97q-7-8-16.5-8t-17.5 8l-120 98q-7 7-7 17t7 17 16.5 7 17.5-7l95-73q8-9 17 0z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
