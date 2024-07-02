export default {
    "type": {
        "control": "select",
        "options": [
            "Text",
            "Email",
            "Number",
            "Password",
            "Tel",
            "URL",
            "Search"
        ]
    },
    "valueState": {
        "control": "select",
        "options": [
            "None",
            "Positive",
            "Critical",
            "Negative",
            "Information"
        ]
    },
    "default": {
        "control": {
            "type": "text"
        },
        "table": {
            "type": {
                "summary": "Array<IInputSuggestionItem>"
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
    "openPicker": {
        "description": "Manually opens the suggestions popover, assuming suggestions are enabled. Items must be preloaded for it to open.",
        "table": {
            "category": "methods"
        },
        "UI5CustomData": {
            "returnValue": {
                "type": {
                    "text": "void"
                }
            }
        }
    },
    "selection-change": {
        "description": "Fired when the user navigates to a suggestion item via the ARROW keys,\nas a preview, before the final selection.",
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
                        "text": "HTMLElement"
                    },
                    "name": "item",
                    "_ui5privacy": "public",
                    "description": "The previewed suggestion item."
                },
                {
                    "type": {
                        "text": "HTMLElement"
                    },
                    "name": "targetRef",
                    "_ui5privacy": "public",
                    "description": "The DOM ref of the suggestion item."
                }
            ]
        }
    }
};
export const componentInfo = {
    "package": "@ui5/webcomponents",
    "tagName": "ui5-input"
};
//# sourceMappingURL=argTypes.js.map