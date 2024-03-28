export default {
    "placementType": {
        "control": "select",
        "options": [
            "Left",
            "Right",
            "Top",
            "Bottom"
        ]
    },
    "horizontalAlign": {
        "control": "select",
        "options": [
            "Center",
            "Left",
            "Right",
            "Stretch"
        ]
    },
    "verticalAlign": {
        "control": "select",
        "options": [
            "Center",
            "Top",
            "Bottom",
            "Stretch"
        ]
    },
    "accessibleRole": {
        "control": "select",
        "options": [
            "None",
            "Dialog",
            "AlertDialog"
        ]
    },
    "header": {
        "control": {
            "type": "text"
        },
        "table": {
            "type": {
                "summary": "Array<HTMLElement>"
            }
        }
    },
    "footer": {
        "control": {
            "type": "text"
        },
        "table": {
            "type": {
                "summary": "Array<HTMLElement>"
            }
        }
    },
    "default": {
        "control": {
            "type": "text"
        },
        "table": {
            "type": {
                "summary": "Array<HTMLElement>"
            }
        }
    },
    "showAt": {
        "description": "Shows the popover.",
        "table": {
            "category": "methods"
        },
        "UI5CustomData": {
            "parameters": [
                {
                    "name": "opener",
                    "type": {
                        "text": "HTMLElement"
                    },
                    "description": "the element that the popover is shown at",
                    "_ui5privacy": "public"
                },
                {
                    "name": "preventInitialFocus",
                    "default": "false",
                    "description": "prevents applying the focus inside the popover",
                    "optional": true,
                    "_ui5privacy": "public",
                    "type": {
                        "text": "boolean"
                    }
                }
            ],
            "returnValue": {
                "type": {
                    "text": "Promise<void>"
                },
                "description": "Resolved when the popover is open"
            }
        }
    },
    "applyFocus": {
        "description": "Focuses the element denoted by `initialFocus`, if provided,\nor the first focusable element otherwise.",
        "table": {
            "category": "methods"
        },
        "UI5CustomData": {
            "returnValue": {
                "type": {
                    "text": "Promise<void>"
                },
                "description": "Promise that resolves when the focus is applied"
            }
        }
    },
    "isOpen": {
        "description": "Tells if the component is opened",
        "table": {
            "category": "methods"
        },
        "UI5CustomData": {
            "returnValue": {
                "type": {
                    "text": "boolean"
                }
            }
        }
    },
    "close": {
        "description": "Closes the popup.",
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
    "before-close": {
        "description": "Fired before the component is closed. This event can be cancelled, which will prevent the popup from closing. **This event does not bubble.**",
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
                        "text": "boolean"
                    },
                    "name": "escPressed",
                    "_ui5privacy": "public",
                    "description": "Indicates that `ESC` key has triggered the event."
                }
            ]
        }
    }
};
export const componentInfo = {
    "package": "@ui5/webcomponents",
    "since": "1.0.0-rc.6",
    "tagName": "ui5-popover"
};
//# sourceMappingURL=argTypes.js.map