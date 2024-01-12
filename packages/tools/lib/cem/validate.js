const fs = require('fs');
const Ajv = require('ajv');
const path = require('path');

const isExternalOnly = process.argv[2] === "--external-only";


// Load your JSON schema
const extenalSchema = require('./schema.json');

// Load your JSON data from the input file
const inputFilePath = path.join(process.cwd(), "dist/custom-elements.json"); // Update with your file path
const customManifest = fs.readFileSync(inputFilePath, 'utf8');
let inputData = JSON.parse(customManifest);

const clearProps = (data) => {
    if (Array.isArray(data)) {
        for (let i = 0; i < data.length; i++) {
            if (typeof data[i] === "object") {
                if (["enum", "interface"].includes(data[i].kind)) {
                    data.splice(i, 1);
                    i--;
                } else {
                    clearProps(data[i]);
                }
            }
        }
    } else if (typeof data === "object") {
        Object.keys(data).forEach(prop => {
            if (prop.startsWith("_ui5")) {
                delete data[prop];
            } else if (typeof data[prop] === "object") {
                clearProps(data[prop]);
            }
        });
    }

    return data;
}

const ajv = new Ajv({ allowUnionTypes: true, allError: true })
let validate;

if (!isExternalOnly) {
    const internalSchema = require('./schema-internal.json');
    validate = ajv.compile(internalSchema)

    // Validate the JSON data against the schema
    if (validate(inputData)) {
        console.log('Validation internal custom-elements successful');
    } else {
        console.error('Validation of internal custom-elements failed');
        // console.error('Validation of internal custom-elements failed:', validate.errors);
    }
}


const inputDataExternal = clearProps(JSON.parse(JSON.stringify(inputData)));
validate = ajv.compile(extenalSchema)

// Validate the JSON data against the schema
if (validate(inputDataExternal)) {
    console.log('Validation external custom-elements successful');
    fs.writeFileSync(inputFilePath, JSON.stringify(inputDataExternal, null, 2), 'utf8');

    if (!isExternalOnly) {
        fs.writeFileSync(inputFilePath.replace("custom-elements", "custom-elements-internal"), JSON.stringify(inputData, null, 2), 'utf8');
    }
} else {
    console.error('Validation of external custom-elements failed:');
    // console.error('Validation of external custom-elements failed:', ajv.errorsText(validate.errors));
}