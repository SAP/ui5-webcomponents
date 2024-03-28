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
        "description": "Shows popover on desktop and dialog on mobile.",
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
                    "description": "Prevents applying the focus inside the popup",
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
                "description": "Resolves when the responsive popover is open"
            }
        }
    },
    "close": {
        "description": "Closes the popover/dialog.",
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
    "isOpen": {
        "description": "Tells if the responsive popover is open.",
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
    "tagName": "ui5-responsive-popover"
};
//# sourceMappingURL=argTypes.js.map