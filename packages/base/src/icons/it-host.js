import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://it-host";
const viewBox = "0 -32 512 512";
const d = "M384 480q14 0 23-9t9-23V0q0-14-9-23t-23-9H128q-14 0-23 9T96 0v448q0 14 9 23t23 9h256zm0-32H128V0h256v448zM176 32q-16 0-16 16t16 16h160q16 0 16-16t-16-16H176zm0 64q-16 0-16 16t16 16h160q16 0 16-16t-16-16H176zm128 224q-20 0-34 14t-14 34 14 34 34 14 34-14 14-34-14-34-34-14z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
