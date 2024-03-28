declare const _default: {
    growing: {
        control: string;
        options: string[];
    };
    mode: {
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
    columns: {
        control: {
            type: string;
        };
        table: {
            type: {
                summary: string;
            };
        };
    };
    "row-click": {
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
                };
                name: string;
                _ui5privacy: string;
                description: string;
            }[];
        };
    };
    "popin-change": {
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
                };
                name: string;
                _ui5privacy: string;
                description: string;
            }[];
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
    columns: string;
};
