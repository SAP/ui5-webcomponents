export default {
    "tabLayout": {
        "control": "select",
        "options": [
            "Inline",
            "Standard"
        ]
    },
    "overflowMode": {
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
                        "text": "Tab",
                        "references": [
                            {
                                "name": "Tab",
                                "package": "@ui5/webcomponents",
                                "module": "dist/Tab.js"
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
    },
    "move-over": {
        "description": "Fired when element is being moved over the tab container.\n\nIf the new position is valid, prevent the default action of the event using `preventDefault()`.",
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
                        "text": "object"
                    },
                    "name": "source",
                    "_ui5privacy": "public",
                    "description": "Contains information about the moved element under `element` property."
                },
                {
                    "type": {
                        "text": "object"
                    },
                    "name": "destination",
                    "_ui5privacy": "public",
                    "description": "Contains information about the destination of the moved element. Has `element` and `placement` properties."
                }
            ]
        }
    },
    "move": {
        "description": "Fired when element is moved to the tab container.\n\n**Note:** `move` event is fired only if there was a preceding `move-over` with prevented default action.",
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
                        "text": "object"
                    },
                    "name": "source",
                    "_ui5privacy": "public",
                    "description": "Contains information about the moved element under `element` property."
                },
                {
                    "type": {
                        "text": "object"
                    },
                    "name": "destination",
                    "_ui5privacy": "public",
                    "description": "Contains information about the destination of the moved element. Has `element` and `placement` properties."
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