import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://generate-shortcut";
const viewBox = "0 -32 512 512";
const d = "M464 448q14 0 23-9.5t9-22.5V32q0-14-9-23t-23-9H208v32h256v288H80v-32H48v128q0 13 9.5 22.5T80 448h384zM145 224q14-2 22.5-11.5T176 189l-9-84q0-15-16-15-7 1-11.5 6t-3.5 11l5 58q-18-8-35-18t-30-22-20.5-27T48 64q0-20 6-32t16.5-19T94 3.5 122 0h-1q16 0 16-16t-16-16l-14 1q-17 0-33 5T45-9 24 21t-8 43 10 45.5T51 146t31.5 27 29.5 17q2 1 2.5 1t2.5 1l-57 1q-7 1-11.5 5.5T45 210q0 6 5 10.5t11 3.5h84z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
