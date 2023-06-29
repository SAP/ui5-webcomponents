import fs from "fs/promises";
import path from "path";

export interface IComponentAPI {
    name: string;
    description: string;
    since?: string;
    visibility: string;
    deprecated?: boolean;
}

export interface IComponentParsedAPI extends IComponentAPI, IComponentUI5CustomData {
    apiType: string;
}

export interface IComponentUI5CustomData {
    parameters?: Record<string, any>;
    returnValue?: Record<string, any>;
}

export interface IComponentProperty extends IComponentParsedAPI {
    type: string;
    defaultValue: string;
    readonly: boolean;
}

interface IComponentEvent extends IComponentParsedAPI {
    parameters: Record<string, any>;
}

export interface IComponentMethod extends IComponentParsedAPI {
    parameters: Record<string, any>;
    returnValue: Record<string, any>;
    readonly: boolean;
    type: string;
}

export interface IComponentSlot extends IComponentParsedAPI {
    type: string;
}

export interface IComponentData {
    kind: string;
    name: string;
    basename: string;
    tagname: string;
    resource: string;
    module: string;
    static: boolean;
    visibility: string;
    since: string;
    extends: string;
    implements: string[];
    description: string;
    constructor: {
        visibility: string;
    };

    properties: IComponentProperty[];
    events: IComponentEvent[];
    methods: IComponentMethod[];
    slots: IComponentSlot[];
}

interface IComponentInfo {
    package: string;
    since: string;
}

interface IApiJson {
    symbols: IComponentData[];
}

export interface IApiReader {
    getApi(): Record<string, any>;
    findApi(componentName: string): IComponentData;
    findInfo(componentName: string): IComponentInfo;
    readApiFiles(apiJsonFiles: string[]): Promise<void[]>;
}

export class ApiReader implements IApiReader {
    constructor() {
        this.api = {};
    }

    private api: Record<string, IApiJson>;

    public getApi() {
        return this.api;
    }

    async readApiFiles(apiJsonFiles: string[]): Promise<void[]> {
        if (!apiJsonFiles || !apiJsonFiles.length) {
            throw new Error("Api json files are required");
        }
        const promises = apiJsonFiles.map(async (apiJsonFile: string) => {
            const jsonData = await fs.readFile(apiJsonFile, "utf8");
            const apiJson = JSON.parse(jsonData);
            // get the package name from the path
            // ../**/**/main/dist/api.json => main at index -3
            const packageName = apiJsonFile.split(path.sep).at(-3);
            if (packageName) {
                this.api[packageName] = apiJson;
            }
        });

        return Promise.all(promises);
    }

    public findApi(componentName: string): IComponentData {
        if (!componentName) {
            throw new Error("Component name is required");
        }

        if (Object.keys(this.api).length === 0) {
            throw new Error("No api files found");
        }

        let componentData = {};

        for (const packageName in this.api) {
            const packageData = this.api[packageName];
            const symbols = packageData.symbols;
            const index = symbols.findIndex(
                (s) => s.basename === componentName || s.name === componentName
            );

            if (index !== -1) {
                componentData = symbols[index];
                break;
            }
        }

        return componentData as IComponentData;
    }

    public findInfo(componentName: string): IComponentInfo {
        if (!componentName) {
            throw new Error("Component name is required");
        }

        if (Object.keys(this.api).length === 0) {
            throw new Error("No api files found");
        }

        let componentData = {};

        for (const packageName in this.api) {
            const packageData = this.api[packageName];
            const symbols = packageData.symbols;
            const index = symbols.findIndex(
                (s) => s.basename === componentName || s.name === componentName
            );

            if (index !== -1) {
                componentData = {
                    package: `@ui5/webcomponents${
                        packageName !== "main" ? `-${packageName}` : ""
                    }`,
                    since: symbols[index].since,
                };
                break;
            }
        }

        return componentData as IComponentInfo;
    }
}
