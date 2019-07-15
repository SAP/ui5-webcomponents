import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://border";
const viewBox = "0 0 512 512";
const d = "M448 480q13 0 22.5-9t9.5-23V64q0-14-9.5-23T448 32H64q-14 0-23 9t-9 23v384q0 14 9 23t23 9h384zm0-32H64V64h384v384z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
