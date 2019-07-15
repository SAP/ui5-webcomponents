import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://refresh";
const viewBox = "0 -32 512 512";
const d = "M478 160q-6-41-25.5-76T404 23.5 337.5-17 257-32q-46 0-86.5 17.5t-71 48-48 71T34 192q0 45 16.5 85T96 347t68 48 84 20h61q26 0 60 1l-41 36q-5 5-5 11.5t5 11.5 11 5 11-5l58-51q9-10 9-23t-9-23l-57-54q-5-5-11-5t-11 5-5 11.5 5 11.5l40 37H257q-40 0-74.5-15T122 328t-41-61-15-75 15-75 41-61 60.5-41T257 0q36 0 68 12t56.5 33.5T423 96t23 64h32z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
