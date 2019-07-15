import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://appointment-2";
const viewBox = "0 -33 512 512";
const d = "M448 453q14 0 23-9t9-23V5q0-14-9-23t-23-9H64q-13 0-22.5 9T32 5v416q0 14 9.5 23t22.5 9h64v32h32v-32h192v32h32v-32h64zm-96-64h32v32h-32v-32zm-224 0h32v32h-32v-32zm320-32H64V5h384v352zM128 229q-14 0-23 9t-9 23 9 23 23 9 23-9 9-23-9-23-23-9zm128 0q-14 0-23 9t-9 23 9 23 23 9 23-9 9-23-9-23-23-9zm128 0q-14 0-23 9t-9 23 9 23 23 9 23-9 9-23-9-23-23-9zm0-128q-14 0-23 9t-9 23 9 23 23 9 23-9 9-23-9-23-23-9zm-128 0q-14 0-23 9t-9 23 9 23 23 9 23-9 9-23-9-23-23-9zm-128 0q-14 0-23 9t-9 23 9 23 23 9 23-9 9-23-9-23-23-9z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
