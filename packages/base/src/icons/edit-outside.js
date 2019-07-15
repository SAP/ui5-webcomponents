import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://edit-outside";
const viewBox = "0 -32 512 512";
const d = "M443 376q5-5 5-11.5t-5-11.5L118 27q-4-4-8-4L0 0l22 110q0 3 1 5t3 4l326 325q5 4 11 4 7 0 11-4zm-121-99l-46 45L53 99h-1l46-46zm87 88l-46 44-64-64 45-45zm94-228q9-10 9-23t-9-23L411 5q-5-5-11-5t-11 5-5 11.5 5 11.5l75 68h-80q-40 0-68-28T288 0v-16q0-16-16-16t-16 16V0q0 27 10 50t27.5 40.5 41 27.5 49.5 10h80l-75 69q-5 5-5 11.5t5 11.5 11 5 11-5z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
