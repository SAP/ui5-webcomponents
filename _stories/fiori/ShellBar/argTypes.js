export default {
    "logoDomRef": {
        "control": {
            "type": false
        }
    },
    "copilotDomRef": {
        "control": {
            "type": false
        }
    },
    "notificationsDomRef": {
        "control": {
            "type": false
        }
    },
    "overflowDomRef": {
        "control": {
            "type": false
        }
    },
    "profileDomRef": {
        "control": {
            "type": false
        }
    },
    "productSwitchDomRef": {
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
                "summary": "Array<ShellBarItem>"
            }
        }
    },
    "profile": {
        "control": {
            "type": "text"
        },
        "table": {
            "type": {
                "summary": "Array<HTMLElement>"
            }
        }
    },
    "logo": {
        "control": {
            "type": "text"
        },
        "table": {
            "type": {
                "summary": "Array<HTMLElement>"
            }
        }
    },
    "menuItems": {
        "control": {
            "type": "text"
        },
        "table": {
            "type": {
                "summary": "Array<ListItemBase>"
            }
        }
    },
    "searchField": {
        "control": {
            "type": "text"
        },
        "table": {
            "type": {
                "summary": "Array<Input>"
            }
        }
    },
    "startButton": {
        "control": {
            "type": "text"
        },
        "table": {
            "type": {
                "summary": "Array<IButton>"
            }
        }
    },
    "closeOverflow": {
        "description": "Closes the overflow area.\nUseful to manually close the overflow after having suppressed automatic closing with preventDefault() of ShellbarItem's press event",
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
    "notifications-click": {
        "description": "Fired, when the notification icon is activated.",
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
                    "description": "dom ref of the activated element"
                }
            ]
        }
    },
    "profile-click": {
        "description": "Fired, when the profile slot is present.",
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
                    "description": "dom ref of the activated element"
                }
            ]
        }
    },
    "product-switch-click": {
        "description": "Fired, when the product switch icon is activated.\n\n**Note:** You can prevent closing of overflow popover by calling `event.preventDefault()`.",
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
                    "description": "dom ref of the activated element"
                }
            ]
        }
    },
    "logo-click": {
        "description": "Fired, when the logo is activated.",
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
                    "description": "dom ref of the activated element"
                }
            ]
        }
    },
    "co-pilot-click": {
        "description": "Fired, when the co pilot is activated.",
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
                    "description": "dom ref of the activated element"
                }
            ]
        }
    },
    "menu-item-click": {
        "description": "Fired, when a menu item is activated\n\n**Note:** You can prevent closing of overflow popover by calling `event.preventDefault()`.",
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
                    "description": "DOM ref of the activated list item"
                }
            ]
        }
    }
};
export const componentInfo = {
    "package": "@ui5/webcomponents-fiori",
    "since": "0.8.0",
    "tagName": "ui5-shellbar"
};
//# sourceMappingURL=argTypes.js.map