import { registerIcon } from "@ui5/webcomponents-base/dist/SVGIconRegistry.js";

const name = "sys-add";
const pathData = "M256 0q53 0 100 20t81.5 54.5T492 156t20 100-20 99.5-54.5 81.5-81.5 55-100 20-99.5-20T75 437t-55-81.5T0 256t20-100 55-81.5T156.5 20 256 0zm0 480q46 0 87-17.5t71.5-48 48-71.5 17.5-87-17.5-87-48-71.5-71.5-48T256 32t-87 17.5-71.5 48-48 71.5T32 256t17.5 87 48 71.5 71.5 48 87 17.5zm-16-208H128v-32h112V128h32v112h112v32H272v112h-32V272z";


registerIcon(name, { pathData });
