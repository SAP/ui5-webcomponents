import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://pushpin-on";
const viewBox = "0 -32 512 512";
const d = "M353 64h31V0q0-14-8.5-23T353-32H33q-14 0-23.5 9T0 0v352l128 128h128v-32h-96v-96q0-14-9-23t-23-9H32V0h321v64zm151 289q8-8 8-18t-8-18q-7-7-18.5-13.5t-25-12-27-10.5-25.5-8q10-29 3-60t-30-54l-68 68-79-79q-5-5-11.5-5t-11.5 5-5 11 5 11l80 80-68 67q23 23 53.5 30t59.5-3q4 12 9 25.5t10.5 27 12 25.5 13.5 19q8 7 18 7t17-7zm-105-50q31 10 50 18.5t27 14.5l-77 77q-6-9-14-28t-18-50l-10-31-31 10q-26 9-53-1l103-104q10 25 2 54l-10 30z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
