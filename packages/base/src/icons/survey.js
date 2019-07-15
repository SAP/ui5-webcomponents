import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://survey";
const viewBox = "0 -32 512 512";
const d = "M173 315l-37 35 18 19 19-17 54 55 18-19zm0-128l-37 37 18 18 19-17 54 55 18-19zM136 62l37 36-37 36 18 18 37-37 36 37 18-18-37-36 37-36-18-18-36 37-37-37zm280 418q14 0 23-9t9-23V0q0-13-9-22.5T416-32H96q-14 0-23 9.5T64 0v448q0 14 9 23t23 9h320zm0-32H96V0h320v448zm-48-64q16 0 16-16 0-6-4.5-11t-11.5-5h-64q-6 0-11 5t-5 11q0 7 5 11.5t11 4.5h64zm0-128q16 0 16-16 0-6-4.5-11t-11.5-5h-64q-6 0-11 5t-5 11q0 7 5 11.5t11 4.5h64zm0-128q16 0 16-16 0-6-4.5-11T368 96h-64q-6 0-11 5t-5 11q0 7 5 11.5t11 4.5h64z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
