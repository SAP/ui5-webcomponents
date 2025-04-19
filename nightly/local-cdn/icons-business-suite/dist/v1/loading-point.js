import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "loading-point";
const pathData = "M226.5 319v-31h62V131h49c28 0 56 14 79 30 23 20 41 45 45 76l8 51h6c8 0 15 3 22 9 6 6 9 13 9 22v94c0 9-3 17-9 23-6 5-13 8-22 8h-33c-7 37-41 63-77 63-37 0-70-26-77-63v-31c4-16 13-31 27-44 15-12 32-18 50-18 36 0 70 26 77 62h33v-94h-249zm-221 94V151c35-27 65-49 92-72 12-9 23-18 34-26 11-9 20-16 31-23s17-13 22-17c7-4 8-7 9-7 0 0 3 2 9 7 7 4 13 10 22 17 8 7 18 14 30 23 11 8 23 17 34 26l-41 7c-19-13-35-26-54-41l-156 118v250h94V226c0-7 1-13 4-16 3-11 16-16 27-16h63c22 0 26 14 31 32h-94v218h-125c-18 0-32-13-32-31zm313-250v125h120l-8-46c-7-45-46-79-93-79h-19zm3 281c2 7 6 13 12 18 9 9 20 14 32 14s23-5 34-14c5-5 9-11 12-18 1-5 2-10 2-15 0-6-1-11-3-16-2-6-6-12-11-17-11-9-22-14-34-14s-23 5-32 14c-6 5-10 11-12 17-2 5-3 10-3 16 0 5 1 10 3 15z";
const ltr = false;
const accData = null;
const collection = "business-suite-v1";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v1/loading-point";
export { pathData, ltr, accData };