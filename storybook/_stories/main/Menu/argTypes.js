export default {
    "default": {
        "control": {
            "type": "text"
        },
        "table": {
            "type": {
                "summary": "Array<MenuItem>"
            }
        }
    },
    "showAt": {
        "description": "Shows the Menu near the opener element.",
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
                }
            ],
            "returnValue": {
                "type": {
                    "text": "Promise<void>"
                }
            }
        }
    },
    "close": {
        "description": "Closes the Menu.",
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
    "item-click": {
        "description": "Fired when an item is being clicked.\n\n**Note:** Since 1.17.0 the event is preventable, allowing the menu to remain open after an item is pressed.",
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
                    "description": "The currently clicked menu item."
                },
                {
                    "type": {
                        "text": "string"
                    },
                    "name": "text",
                    "_ui5privacy": "public",
                    "description": "The text of the currently clicked menu item."
                }
            ]
        }
    },
    "before-open": {
        "description": "Fired before the menu is opened. This event can be cancelled, which will prevent the menu from opening. **This event does not bubble.**\n\n**Note:** Since 1.14.0 the event is also fired before a sub-menu opens.",
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
                    "description": "The `ui5-menu-item` that triggers opening of the sub-menu or undefined when fired upon root menu opening.",
                    "_ui5since": "1.14.0"
                }
            ]
        }
    },
    "before-close": {
        "description": "Fired before the menu is closed. This event can be cancelled, which will prevent the menu from closing. **This event does not bubble.**",
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
    },
    "item-focus": {
        "description": "Fired when a menu item receives focus.",
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
                    "name": "ref",
                    "_ui5privacy": "public",
                    "description": "The currently focused element representing a <code>ui5-menu-item</code>."
                },
                {
                    "type": {
                        "text": "HTMLElement"
                    },
                    "name": "item",
                    "_ui5privacy": "public",
                    "description": "The <code>ui5-menu-item</code> represented by the focused element."
                }
            ]
        }
    }
};
export const componentInfo = {
    "package": "@ui5/webcomponents",
    "since": "1.3.0",
    "tagName": "ui5-menu"
};
//# sourceMappingURL=argTypes.js.map