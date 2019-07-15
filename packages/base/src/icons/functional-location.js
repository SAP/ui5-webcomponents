import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://functional-location";
const viewBox = "0 -32 512 512";
const d = "M443.5 155v-38h-373v38h186l-104 183q-5 10-6.5 20t-1.5 20q0 23 9 43.5t24 35.5 35.5 24 44.5 9q23 0 43.5-9t35.5-24 24-35.5 9-43.5q0-19-8-41l-104-182h186zm-261 223q0-14 4-26l71-123 69 123q5 11 5 26 0 31-21.5 52.5T257.5 452q-32 0-53.5-21.5T182.5 378zM70.5 80h373V-32h-373V80zm112-74h149v36h-149V6zm-68 185h-44l46 74h34l32-36h-46zm249 74h34l46-74h-45l-21 38h-35zm-70 113q0-15-10.5-26t-25.5-11q-17 0-27.5 11t-10.5 26q0 16 10.5 27t27.5 11q15 0 25.5-11t10.5-27z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
