declare const _default: {
    state: {
        control: string;
        options: string[];
    };
    accessibleRole: {
        control: string;
        options: string[];
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
    footer: {
        control: {
            type: string;
        };
        table: {
            type: {
                summary: string;
            };
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
    applyFocus: {
        description: string;
        table: {
            category: string;
        };
        UI5CustomData: {
            returnValue: {
                type: {
                    text: string;
                };
                description: string;
            };
        };
    };
    "before-close": {
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
    header: string;
    footer: string;
    default: string;
};
