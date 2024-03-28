declare const _default: {
    placementType: {
        control: string;
        options: string[];
    };
    horizontalAlign: {
        control: string;
        options: string[];
    };
    verticalAlign: {
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
    showAt: {
        description: string;
        table: {
            category: string;
        };
        UI5CustomData: {
            parameters: ({
                name: string;
                type: {
                    text: string;
                };
                description: string;
                _ui5privacy: string;
                default?: undefined;
                optional?: undefined;
            } | {
                name: string;
                default: string;
                description: string;
                optional: boolean;
                _ui5privacy: string;
                type: {
                    text: string;
                };
            })[];
            returnValue: {
                type: {
                    text: string;
                };
                description: string;
            };
        };
    };
    close: {
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
    isOpen: {
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
    since: string;
    tagName: string;
};
export type StoryArgsSlots = {
    header: string;
    footer: string;
    default: string;
};
