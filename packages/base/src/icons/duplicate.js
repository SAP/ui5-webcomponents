import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://duplicate";
const viewBox = "0 -32 512 512";
const d = "M32 96h96V64H32q-14 0-23 9T0 96v352q0 13 9 22.5t23 9.5h256q13 0 22.5-9.5T320 448v-32h-32v32H32V96zm448 288q13 0 22.5-9.5T512 352V0q0-14-9.5-23T480-32H224q-14 0-23 9t-9 23v64h32V0h256v352H224v-65h-32v65q0 13 9 22.5t23 9.5h256zM375 200q9-10 9-23t-9-23l-92-86q-5-5-11-5t-11 5-5 11.5 5 11.5l75 69H145q-16 0-16 16t16 16h191l-75 68q-5 5-5 11.5t5 11.5 11 5 11-5z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
