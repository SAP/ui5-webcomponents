import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://filter-fields";
const viewBox = "0 0 512 512";
const d = "M48 448q-6 0-11 4.5T32 464q0 6 5 11t11 5h160q7 0 11.5-5t4.5-11q0-16-16-16H48zm0-256q-6 0-11 4.5T32 208q0 6 5 11t11 5h160q7 0 11.5-5t4.5-11q0-16-16-16H48zm400 224q14 0 23-9.5t9-22.5v-64q0-14-9-23t-23-9H64q-13 0-22.5 9T32 320v64q0 13 9.5 22.5T64 416h384zm0-32H64v-64h384v64zm0-224q14 0 23-9.5t9-22.5V64q0-14-9-23t-23-9H64q-13 0-22.5 9T32 64v64q0 13 9.5 22.5T64 160h384zm0-32H64V64h384v64z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
