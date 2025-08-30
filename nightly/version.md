commit bd9299e884215375b52badca943aae68d1e77d6a
Author: ilhan orhan <ilhan.orhan007@gmail.com>
Date:   Fri Aug 29 19:28:08 2025 +0300

    fix(ui5-form-item): update host element display (#12208)
    
    The isElementHidden method called internally by getFirstFocusableElement returns true on Safari for the ui5-form-item, considering the element as hidden, skipping the traverse of its children. This happens, because el.offsetHight and offsetWidth for the host custom element (ui5-form-item custom element in the specific issue) are 0 on Safari.
    This probably happens for other components - Safari's layout engine doesn't always calculate dimensions correctly for the host element when content is in shadow DOM.
    Solution - add display to the host element.
    
    Fixes: #12201
