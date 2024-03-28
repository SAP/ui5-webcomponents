export default {
    "valueState": {
        "control": "select",
        "options": [
            "None",
            "Success",
            "Warning",
            "Error",
            "Information"
        ]
    },
    "filter": {
        "control": "select",
        "options": [
            "StartsWithPerTerm",
            "StartsWith",
            "Contains",
            "None"
        ]
    },
    "default": {
        "control": {
            "type": "text"
        },
        "table": {
            "type": {
                "summary": "Array<IComboBoxItem>"
            }
        }
    },
    "valueStateMessage": {
        "control": {
            "type": "text"
        },
        "table": {
            "type": {
                "summary": "Array<HTMLElement>"
            }
        }
    },
    "icon": {
        "control": {
            "type": "text"
        },
        "table": {
            "type": {
                "summary": "Array<IIcon>"
            }
        }
    },
    "selection-change": {
        "description": "Fired when selection is changed by user interaction",
        "control": {
            "type": false
        },
        "table": {
            "category": "events"
        },
        "UI5CustomData": {
            "parameters": [
                {
                    "type": {
                        "text": "IComboBoxItem",
                        "references": [
                            {
                                "name": "IComboBoxItem",
                                "package": "@ui5/webcomponents",
                                "module": "dist/ComboBox.js"
                            }
                        ]
                    },
                    "name": "item",
                    "_ui5privacy": "public",
                    "description": "item to be selected."
                }
            ]
        }
    }
};
export const componentInfo = {
    "package": "@ui5/webcomponents",
    "since": "1.0.0-rc.6",
    "tagName": "ui5-combobox"
};
//# sourceMappingURL=argTypes.js.map