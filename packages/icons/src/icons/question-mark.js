import { registerIcon } from "@ui5/webcomponents-base/dist/SVGIconRegistry.js";

const name = "question-mark";
const pathData = "M448 32q14 0 23 9t9 23v384q0 13-9 22.5t-23 9.5H64q-14 0-23-9.5T32 448V64q0-14 9-23t23-9h384zm0 32H64v384h384V64zm-192 71q-23 0-38 14.5T198 187h-48q0-14 7.5-29t21-27 32.5-19.5 42-7.5q43 0 68.5 21.5T347 181q0 22-13 36.5T309 245q-8 9-15 15.5t-11.5 14T276 292t0 28h-50q0-16 1-27.5t4.5-21T243 253t23-21l20-17q8-5 15-16t7-21q0-15-14.5-29T256 135zm0 217q14 0 23 9t9 23q0 13-9 22.5t-23 9.5-23-9.5-9-22.5q0-14 9-23t23-9z";


registerIcon(name, { pathData });
