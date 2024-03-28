declare const _default: {
    dateValue: {
        control: {
            type: boolean;
        };
    };
    dateValueUTC: {
        control: {
            type: boolean;
        };
    };
    startDateValue: {
        control: {
            type: boolean;
        };
    };
    endDateValue: {
        control: {
            type: boolean;
        };
    };
    valueState: {
        control: string;
        options: string[];
    };
    primaryCalendarType: {
        control: string;
        options: string[];
    };
    secondaryCalendarType: {
        control: string;
        options: string[];
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
    isValid: {
        description: string;
        table: {
            category: string;
        };
        UI5CustomData: {
            parameters: {
                name: string;
                type: {
                    text: string;
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
    isInValidRange: {
        description: string;
        table: {
            category: string;
        };
        UI5CustomData: {
            parameters: {
                name: string;
                type: {
                    text: string;
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
    formatValue: {
        description: string;
        table: {
            category: string;
        };
        UI5CustomData: {
            parameters: {
                name: string;
                type: {
                    text: string;
                };
                description: string;
                _ui5privacy: string;
            }[];
            returnValue: {
                type: {
                    text: string;
                };
                description: string;
            };
        };
    };
    closePicker: {
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
                description: string;
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
                description: string;
            };
        };
    };
    change: {
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
    input: {
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
    "value-state-change": {
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
    valueStateMessage: string;
};
