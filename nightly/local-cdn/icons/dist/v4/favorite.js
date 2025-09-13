import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "favorite";
const pathData = "M378.36 297.834q-5.996 3.998-2.998 8.995l71.96 193.892q1.999 4.997-2.499 8.995t-9.494.999l-174.903-123.93q-4.997-3-8.995 0L76.53 510.714q-4.997 2.998-9.495-1t-2.499-8.994l71.96-193.892q2-5.997-2.998-8.995L3.569 205.885q-4.997-2.998-2.998-8.495t6.996-5.497h165.908q4.997 0 7.995-4.997L248.433 4.997Q250.432 0 255.929 0t7.495 4.997l66.963 181.899q1.999 4.997 7.996 4.997H503.29q5.996 0 7.995 5.497t-2.998 8.495z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/favorite";
export { pathData, ltr, accData };