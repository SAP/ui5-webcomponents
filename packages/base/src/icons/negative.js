import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://negative";
const viewBox = "0 0 512 512";
const d = "M448 480q13 0 22.5-9.5T480 448V64q0-14-9.5-23T448 32H64q-14 0-23 9t-9 23v384q0 13 9 22.5t23 9.5h384zm0-32H64V64h384v384zM128 240v32h256v-32H128z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
