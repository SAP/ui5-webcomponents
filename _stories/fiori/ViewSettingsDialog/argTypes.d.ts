declare const _default: {
    sortItems: {
        control: {
            type: string;
        };
        table: {
            type: {
                summary: string;
            };
        };
    };
    filterItems: {
        control: {
            type: string;
        };
        table: {
            type: {
                summary: string;
            };
        };
    };
    show: {
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
    setConfirmedSettings: {
        description: string;
        table: {
            category: string;
        };
        UI5CustomData: {
            parameters: {
                name: string;
                type: {
                    text: string;
                    references: {
                        name: string;
                        package: string;
                        module: string;
                    }[];
                };
                description: string;
                _ui5privacy: string;
            }[];
            returnValue: {
                type: {
                    text: string;
                };
            };
        };
    };
    confirm: {
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
    cancel: {
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
    sortItems: string;
    filterItems: string;
};
