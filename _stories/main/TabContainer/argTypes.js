export default {
    "tabLayout": {
        "control": "select",
        "options": [
            "Inline",
            "Standard"
        ]
    },
    "tabsOverflowMode": {
        "control": "select",
        "options": [
            "End",
            "StartAndEnd"
        ]
    },
    "headerBackgroundDesign": {
        "control": "select",
        "options": [
            "Solid",
            "Transparent",
            "Translucent"
        ]
    },
    "contentBackgroundDesign": {
        "control": "select",
        "options": [
            "Solid",
            "Transparent",
            "Translucent"
        ]
    },
    "allItems": {
        "control": {
            "type": false
        }
    },
    "default": {
        "control": {
            "type": "text"
        },
        "table": {
            "type": {
                "summary": "Array<ITab>"
            }
        }
    },
    "overflowButton": {
        "control": {
            "type": "text"
        },
        "table": {
            "type": {
                "summary": "Array<IButton>"
            }
        }
    },
    "startOverflowButton": {
        "control": {
            "type": "text"
        },
        "table": {
            "type": {
                "summary": "Array<IButton>"
            }
        }
    },
    "tab-select": {
        "description": "Fired when a tab is selected.",
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
                        "text": "ITab",
                        "references": [
                            {
                                "name": "ITab",
                                "package": "@ui5/webcomponents",
                                "module": "dist/TabContainer.js"
                            }
                        ]
                    },
                    "name": "tab",
                    "_ui5privacy": "public",
                    "description": "The selected `tab`."
                },
                {
                    "type": {
                        "text": "Integer",
                        "references": [
                            {
                                "name": "Integer",
                                "package": "@ui5/webcomponents-base",
                                "module": "dist/types/Integer.js"
                            }
                        ]
                    },
                    "name": "tabIndex",
                    "_ui5privacy": "public",
                    "description": "The selected `tab` index in the flattened array of all tabs and their subTabs, provided by the `allItems` getter."
                }
            ]
        }
    }
};
export const componentInfo = {
    "package": "@ui5/webcomponents",
    "tagName": "ui5-tabcontainer"
};
//# sourceMappingURL=argTypes.js.map