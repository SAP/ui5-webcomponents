import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://table-column";
const viewBox = "0 0 512 512";
const d = "M448 480q14 0 23-9t9-23V64q0-14-9-23t-23-9H64q-13 0-22.5 9T32 64v384q0 14 9.5 23t22.5 9h384zM312 168H200V64h112v104zm0 141H200V200h112v109zm0 139H200V341h112v107zm136-280H344V64h104v104zm0 141H344V200h104v109zm0 139H344V341h104v107z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
