import { registerIcon } from "@ui5/webcomponents-base/dist/SVGIconRegistry.js";

const name = "shield";
const pathData = "M472 49v254q0 49-41 96-16 19-40.5 37t-47 32-39.5 22.5-18 8.5l-29 13-30-13q-3-2-28-13.5T144 453q-54-38-78.5-75T41 303V49L257 0zm-36 29L257 37 77 78v225q0 38 31 72 14 16 36 32.5t43 29.5 37 21 18 8l15 7 14-7q1 0 25-12t52-31q88-58 88-120V78zm-35 225q0 24-21 47t-47 41-49 29.5-27 12.5V236h144v67zM112 106l145-33v163H112V106z";


registerIcon(name, { pathData });
