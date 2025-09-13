import { isClickInRect } from "@ui5/webcomponents-base/dist/util/PopupUtils.js";
import getActiveElement from "@ui5/webcomponents-base/dist/util/getActiveElement.js";
import getParentElement from "@ui5/webcomponents-base/dist/util/getParentElement.js";
import { instanceOfPopover } from "../Popover.js";
import { getOpenedPopups, addOpenedPopup, removeOpenedPopup } from "./OpenedPopupsRegistry.js";
let updateInterval;
const intervalTimeout = 300;
const openedRegistry = [];
const repositionPopovers = () => {
    openedRegistry.forEach(popover => {
        popover.instance.reposition();
    });
};
const closePopoversIfLostFocus = () => {
    let activeElement = getActiveElement();
    if (activeElement.tagName === "IFRAME") {
        getRegistry().reverse().forEach(popup => {
            const popover = popup.instance;
            const opener = popover.getOpenerHTMLElement(popover.opener);
            while (activeElement) {
                if (activeElement === opener) {
                    return;
                }
                activeElement = getParentElement(activeElement);
            }
            popover.closePopup(false, false, true);
        });
    }
};
const runUpdateInterval = () => {
    updateInterval = setInterval(() => {
        repositionPopovers();
        closePopoversIfLostFocus();
    }, intervalTimeout);
};
const stopUpdateInterval = () => {
    clearInterval(updateInterval);
};
const attachGlobalScrollHandler = () => {
    document.addEventListener("scroll", repositionPopovers, { capture: true });
};
const detachGlobalScrollHandler = () => {
    document.removeEventListener("scroll", repositionPopovers, { capture: true });
};
const attachScrollHandler = (popover) => {
    popover && popover.shadowRoot.addEventListener("scroll", repositionPopovers, { capture: true });
};
const detachScrollHandler = (popover) => {
    popover && popover.shadowRoot.removeEventListener("scroll", repositionPopovers, { capture: true });
};
const attachGlobalClickHandler = () => {
    document.addEventListener("mousedown", clickHandler, { capture: true });
};
const detachGlobalClickHandler = () => {
    document.removeEventListener("mousedown", clickHandler, { capture: true });
};
const clickHandler = (event) => {
    const openedPopups = getOpenedPopups();
    if (openedPopups.length === 0) {
        return;
    }
    const isTopPopupPopover = instanceOfPopover(openedPopups[openedPopups.length - 1].instance);
    if (!isTopPopupPopover) {
        return;
    }
    // loop all open popovers
    for (let i = (openedPopups.length - 1); i !== -1; i--) {
        const popup = openedPopups[i].instance;
        // if popup is modal, opener is clicked, popup is dialog skip closing
        if (popup.isModal || popup.isOpenerClicked(event)) {
            return;
        }
        if (isClickInRect(event, popup.getBoundingClientRect())) {
            break;
        }
        popup.closePopup();
    }
};
const addOpenedPopover = (instance) => {
    const parentPopovers = getParentPopoversIfNested(instance);
    addOpenedPopup(instance, parentPopovers);
    openedRegistry.push({
        instance,
        parentPopovers,
    });
    attachScrollHandler(instance);
    if (openedRegistry.length === 1) {
        attachGlobalScrollHandler();
        attachGlobalClickHandler();
        runUpdateInterval();
    }
};
const removeOpenedPopover = (instance) => {
    const popoversToClose = [instance];
    for (let i = 0; i < openedRegistry.length; i++) {
        const indexOfCurrentInstance = openedRegistry[i].parentPopovers.indexOf(instance);
        if (openedRegistry[i].parentPopovers.length > 0 && indexOfCurrentInstance > -1) {
            popoversToClose.push(openedRegistry[i].instance);
        }
    }
    for (let i = popoversToClose.length - 1; i >= 0; i--) {
        for (let j = 0; j < openedRegistry.length; j++) {
            let indexOfItemToRemove = -1;
            if (popoversToClose[i] === openedRegistry[j].instance) {
                indexOfItemToRemove = j;
            }
            if (indexOfItemToRemove >= 0) {
                removeOpenedPopup(openedRegistry[indexOfItemToRemove].instance);
                detachScrollHandler(openedRegistry[indexOfItemToRemove].instance);
                const itemToClose = openedRegistry.splice(indexOfItemToRemove, 1);
                itemToClose[0].instance.closePopup(false, true);
            }
        }
    }
    if (!openedRegistry.length) {
        detachGlobalScrollHandler();
        detachGlobalClickHandler();
        stopUpdateInterval();
    }
};
const getRegistry = () => {
    return openedRegistry;
};
const getParentPopoversIfNested = (instance) => {
    let currentElement = instance.parentNode;
    const parentPopovers = [];
    while (currentElement && currentElement.parentNode) {
        for (let i = 0; i < openedRegistry.length; i++) {
            if (currentElement === openedRegistry[i].instance) {
                parentPopovers.push(currentElement);
            }
        }
        currentElement = currentElement.parentNode;
    }
    return parentPopovers;
};
export { addOpenedPopover, removeOpenedPopover, getRegistry };
//# sourceMappingURL=PopoverRegistry.js.map