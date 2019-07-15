import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://attachment-text-file";
const viewBox = "0 -32 512 512";
const d = "M432 480q14 0 23-9.5t9-22.5V0q0-14-8.5-23T433-32H81q-14 0-23.5 9T48 0v352l128 128h256zm1-480l-1 448H208v-96q0-14-9-23t-23-9H80V0h353zM144 288h224v-32h-96V64h-32v192h-96v32z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
