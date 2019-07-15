import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://meal";
const viewBox = "0 -32 512 512";
const d = "M362.5 479q10-1 16-7t6-14V224h-43q0 29-6.5 42t-15 19.5-15 10.5-6.5 15l43 151q5 17 21 17zm-21-274h43V11q0-17-6.5-30t-15.5-13-15 13-6 30v194zm-85 114q0-11-7-20t-18-11q-4-9-11-26.5t-7-37.5h-42q0 14-5 31t-9 25l-4 8q-10 2-17 11t-7 20l18 151q2 9 9 9 9-2 9-11V330h10l9 140q0 9 8 9 9 0 9-9l10-140h9v138q0 9 8 11 8 0 10-9l17-140zm-86-114h43V11q0-17-6.5-30t-15.5-13q-8 0-14.5 13t-6.5 30v194z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
