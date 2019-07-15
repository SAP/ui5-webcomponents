import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://it-instance";
const viewBox = "0 -32 512 512";
const d = "M352 480q14 0 23-9t9-23V0q0-14-9-23t-23-9H160q-13 0-22.5 9T128 0v448q0 14 9.5 23t22.5 9h192zm0-32H160V0h192v448zM208 64q-16 0-16 16t16 16h96q16 0 16-16t-16-16h-96zm80 288q-14 0-23 9t-9 23 9 23 23 9 23-9 9-23-9-23-23-9z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
