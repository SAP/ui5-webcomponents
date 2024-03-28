declare const _default: {
    design: {
        control: string;
        options: string[];
    };
    default: {
        control: {
            type: string;
        };
        table: {
            type: {
                summary: string;
            };
        };
    };
    subTabs: {
        control: {
            type: string;
        };
        table: {
            type: {
                summary: string;
            };
        };
    };
    getTabInStripDomRef: {
        description: string;
        table: {
            category: string;
        };
        UI5CustomData: {
            returnValue: {
                type: {
                    text: string;
                    references: {
                        name: string;
                        package: string;
                        module: string;
                    }[];
                };
            };
        };
    };
};
export default _default;
export declare const componentInfo: {
    package: string;
    tagName: string;
    showDefaultStoryOnly: boolean;
};
export type StoryArgsSlots = {
    default: string;
    subTabs: string;
};
