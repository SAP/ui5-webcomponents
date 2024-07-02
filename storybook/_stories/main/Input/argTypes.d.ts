declare const _default: {
    type: {
        control: string;
        options: string[];
    };
    valueState: {
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
    icon: {
        control: {
            type: string;
        };
        table: {
            type: {
                summary: string;
            };
        };
    };
    valueStateMessage: {
        control: {
            type: string;
        };
        table: {
            type: {
                summary: string;
            };
        };
    };
    openPicker: {
        description: string;
        table: {
            category: string;
        };
        UI5CustomData: {
            returnValue: {
                type: {
                    text: string;
                };
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
    icon: string;
    valueStateMessage: string;
};
