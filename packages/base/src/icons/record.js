import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://record";
const viewBox = "0 0 512 512";
const d = "M255 367q24 0 44.5-8.5t36-23.5 24-35.5T368 256q0-24-8.5-44t-24-35.5-36-24T255 144q-23 0-43 8.5t-35.5 24-24 35.5-8.5 44q0 23 8.5 43.5t24 35.5 35.5 23.5 43 8.5zm193 113q13 0 22.5-9.5T480 448V64q0-14-9.5-23T448 32H64q-14 0-23 9t-9 23v384q0 13 9 22.5t23 9.5h384zm0-32H64V64h384v384z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
