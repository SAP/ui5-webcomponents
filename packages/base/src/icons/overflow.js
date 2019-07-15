import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://overflow";
const viewBox = "0 0 512 512";
const d = "M448 160q26 0 45-19t19-45-19-45-45-19-45 19-19 45 19 45 45 19zm0-96q14 0 23 9t9 23-9 23-23 9-23-9-9-23 9-23 23-9zm-192 96q26 0 45-19t19-45-19-45-45-19-45 19-19 45 19 45 45 19zm0-96q14 0 23 9t9 23-9 23-23 9-23-9-9-23 9-23 23-9zM64 160q26 0 45-19t19-45-19-45-45-19-45 19T0 96t19 45 45 19zm0-96q14 0 23 9t9 23-9 23-23 9-23-9-9-23 9-23 23-9z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
