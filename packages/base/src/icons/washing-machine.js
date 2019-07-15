import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://washing-machine";
const viewBox = "0 0 512 512";
const d = "M384 353q-13 0-22.5 9.5T352 385q0 14 9.5 23t22.5 9q14 0 23-9t9-23q0-13-9-22.5t-23-9.5zm64 127q14 0 23-8.5t9-22.5V65q0-13-9-23t-23-10H64q-13 0-22.5 10T32 65v384q0 14 9.5 22.5T64 480h384zm0-31H64V65h384v384zM256 97q-26 0-49.5 10t-41 27.5T138 175t-10 50 10 50 27.5 40.5 41 27.5 49.5 10q27 0 50.5-10t40.5-27.5 27-40.5 10-50-10-50-27-40.5-40.5-27.5T256 97zm0 224q-40 0-68-28t-28-68 28-68 68-28 68 28 28 68q0 41-27.5 68.5T256 321z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
