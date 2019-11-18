import { registerIcon } from "@ui5/webcomponents-base/dist/SVGIconRegistry.js";

const name = "pdf-reader";
const pathData = "M269 316q13-20 22.5-39.5T307 237q-6-6-8-20t-2-22q0-20 6-34t19-14q21 0 21 43 0 18-6 43 22 42 45 56l27-6q5-1 8.5-1.5t6.5-.5q20 0 38 10t18 23q0 21-31 21-16 0-37-5t-35-13q-29 6-51.5 11T288 338q-30 46-48 46l-7-1q-18-6-18-23 0-16 26-33zm147 100q0 14-9 23t-23 9H128q-14 0-23-9t-9-23V160l96-96h192q13 0 22.5 9t9.5 23v32h-32V96H224v64q0 14-9.5 23t-23.5 9h-63v224h256v-32h32v32zM32 128H0V96q0-40 28-68T96 0h32v32H96q-27 0-45.5 19T32 96v32zm0 288q0 26 18.5 45T96 480h32v32H96q-40 0-68-28T0 416v-32h32v32zM416 0q19 0 36.5 7.5t31 20.5 21 30.5T512 96v32h-32V96q0-26-19-45t-45-19h-32V0h32zm64 384h32v32q0 20-7.5 37.5t-21 30.5-31 20.5T416 512h-32v-32h32q26 0 45-19t19-45v-32z";


registerIcon(name, { pathData });
