declare const _default: {
    tabLayout: {
        control: string;
        options: string[];
    };
    tabsOverflowMode: {
        control: string;
        options: string[];
    };
    headerBackgroundDesign: {
        control: string;
        options: string[];
    };
    contentBackgroundDesign: {
        control: string;
        options: string[];
    };
    allItems: {
        control: {
            type: boolean;
        };
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
    overflowButton: {
        control: {
            type: string;
        };
        table: {
            type: {
                summary: string;
            };
        };
    };
    startOverflowButton: {
        control: {
            type: string;
        };
        table: {
            type: {
                summary: string;
            };
        };
    };
    "tab-select": {
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
    tagName: string;
};
export type StoryArgsSlots = {
    default: string;
    overflowButton: string;
    startOverflowButton: string;
};
