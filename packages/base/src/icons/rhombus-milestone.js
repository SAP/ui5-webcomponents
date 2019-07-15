import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://rhombus-milestone";
const viewBox = "0 0 512 512";
const d = "M461 302q19-19 19-45.5T461 211L302 51q-21-19-46-19-24 0-45 19L51 211q-19 19-19 45.5T51 302l160 160q19 18 45 18t46-18zm-22-68q9 9 9 22 0 14-9 23L279 439q-9 9-23 9-13 0-22-9L74 279q-10-9-10-22.5T74 234L234 74q10-10 22-10 13 0 23 10z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
