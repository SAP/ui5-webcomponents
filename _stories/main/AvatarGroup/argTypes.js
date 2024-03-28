export default {
    "type": {
        "control": "select",
        "options": [
            "Group",
            "Individual"
        ]
    },
    "hiddenItems": {
        "control": {
            "type": false
        }
    },
    "colorScheme": {
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
                "summary": "Array<IAvatarGroupItem>"
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
    "click": {
        "description": "Fired when the component is activated either with a\nclick/tap or by using the Enter or Space key.",
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
                    "name": "targetRef",
                    "_ui5privacy": "public",
                    "description": "The DOM ref of the clicked item."
                },
                {
                    "type": {
                        "text": "boolean"
                    },
                    "name": "overflowButtonClicked",
                    "_ui5privacy": "public",
                    "description": "indicates if the overflow button is clicked"
                }
            ]
        }
    }
};
export const componentInfo = {
    "package": "@ui5/webcomponents",
    "since": "1.0.0-rc.11",
    "tagName": "ui5-avatar-group"
};
//# sourceMappingURL=argTypes.js.map