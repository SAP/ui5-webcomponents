import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://screen-split-one";
const viewBox = "0 0 512 512";
const d = "M448 480q14 0 23-9t9-23V64q0-13-9-22.5T448 32H64q-14 0-23 9.5T32 64v384q0 14 9 23t23 9h384zM160 64v384H64V64h96zm288 384H192V64h256v384z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
