import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://physical-activity";
const viewBox = "0 -31 512 512";
const d = "M394 390q-23 0-34 13.5T349 436t11 32 34 13q18 0 31.5-13t13.5-32-13.5-32.5T394 390zm81-127q19 0 19-19 0-7-5-13t-14-6h-72q-15 0-22 15l-16 32 28 49 28-58h54zm-293-76l39-39-31-53q-7-13-26-15H47q-28 0-28 27t28 27h103zm176-64q8-8 8-22 0-9-4-18l-51-96q-5-9-12.5-13T286-30q-11 0-20.5 8T256-2q0 9 4 13l45 80-113 113 76 124-146-33q-1-1-6-1-10 0-17 4.5T92 317q0 15 18 20l211 51q8 2 12 2 22 0 35-18l5-8 10-22-91-154z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
