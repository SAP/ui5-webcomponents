declare const _default: {
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
    fixedItems: {
        control: {
            type: string;
        };
        table: {
            type: {
                summary: string;
            };
        };
    };
    header: {
        control: {
            type: string;
        };
        table: {
            type: {
                summary: string;
            };
        };
    };
    "selection-change": {
        description: string;
        control: {
            type: boolean;
        };
        table: {
            category: string;
        };
        UI5CustomData: {
            parameters: {
                type: {
                    text: string;
                    references: {
                        name: string;
                        package: string;
                        module: string;
                    }[];
                };
                name: string;
                _ui5privacy: string;
                description: string;
            }[];
        };
    };
};
export default _default;
export declare const componentInfo: {
    package: string;
    since: string;
    tagName: string;
};
export type StoryArgsSlots = {
    default: string;
    fixedItems: string;
    header: string;
};
