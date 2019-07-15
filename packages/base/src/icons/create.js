import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://create";
const viewBox = "0 -32 512 512";
const d = "M353 192h31V0q0-14-8.5-23T353-32H33q-14 0-23.5 9T0 0v352l128 128h192v-32H160v-96q0-14-9-23t-23-9H32V0h321v192zm95 145l24-75-64 46-64-46 24 75-64 47h80l24 75 25-75h79zM272 96q16 0 16-16 0-6-4.5-11T272 64H112q-6 0-11 5t-5 11q0 7 5 11.5t11 4.5h160zm0 64q16 0 16-16 0-6-4.5-11t-11.5-5H112q-6 0-11 5t-5 11q0 7 5 11.5t11 4.5h160z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
