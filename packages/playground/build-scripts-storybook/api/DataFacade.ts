import { IApiReader, IComponentAPI, IComponentData, IComponentParsedAPI } from "./ApiReader";

const EXCLUDE_LIST = [
    "effectiveDir",
    "isUI5Element",
    "attachInvalidate",
    "define",
    "detachInvalidate",
    "fireEvent",
    "focus",
    "getDomRef",
    "getFocusDomRef",
    "getFocusDomRefAsync",
    "getMetadata",
    "getSlottedNodes",
    "getUniqueDependencies",
    "onAfterRendering",
    "onBeforeRendering",
    "onEnterDOM",
    "onExitDOM",
    "onInvalidation",
    "getStaticAreaItemDomRef",
];

const INCLUDE_API_LIST = [
    "properties",
    "slots",
    "methods",
    "events",
];

export interface IDataFacade {
    parse(apiReader: IApiReader, stories: string[]): Map<string, IComponentParsedAPI[]>;
}

export class DataFacade implements IDataFacade {
    parse(apiReader: IApiReader, stories: string[]): Map<string, IComponentParsedAPI[]> {
        let parsedStoriesData = new Map<string, IComponentParsedAPI[]>();

        stories.forEach((storyName) => {
            let parsed: IComponentParsedAPI[] = [];
            const rawData = apiReader.findApi(storyName);

            if (rawData) {
                INCLUDE_API_LIST.forEach((apiType) => {
                    const fieldData = rawData[apiType as keyof IComponentData] as IComponentAPI[];

                    if (Array.isArray(fieldData)) {
                        parsed = [...parsed, ...fieldData
                            .filter((item) => !EXCLUDE_LIST.includes(item.name) && item.visibility === "public")
                            .map((item) => ({ ...item, apiType }))];
                    }
                });

                if (rawData.extends) {
                    const parentData = this.parse(apiReader, [rawData.extends]);
                    parsed = [...parsed, ...parentData.get(rawData.extends) || []];
                }
            }

            parsedStoriesData.set(storyName, parsed);
        });

        return parsedStoriesData;
    }
}