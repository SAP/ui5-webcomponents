commit 9d3b6791ce594907b558f314006ad7a8aedc2983
Author: Stanislav Bodurov <stbodurov@icloud.com>
Date:   Mon Jul 25 14:34:16 2022 +0300

    chore(ui5-badge): implement IBadge interface (#5416)
    
    With this change, `ui5-badge` is defined as a component that may be nested in a `badge` slot.
    
    To implement badge support (e.g. for `ui5-button`):
    
    1. Define a `badge` slot:
    
    `packages/main/src/Button.js`:
    ```js
    slots: /** @lends sap.ui.webcomponents.main.Button.prototype */ {
            /**
             * Defines the optional <code>ui5-badge</code> that will be used.
             *
             * @type {sap.ui.webcomponents.main.IBadge}
             * @slot
             * @public
             * @since 1.5.0
             */
            badge: {
                    type: HTMLElement,
            },
    }
    ```
    
    2. Same as above, for the Handlebars template:
    `packages/main/src/Button.hbs`:
    ```html
    <button>
    ...
            <slot name="badge"></slot>
    ...
    </button>
    ```
    
    3. Use the `::slotted([ui5-badge][slot="badge"])` selector to apply styles:
    
    ```css
    ::slotted([ui5-badge][slot="badge"]) {
            min-width: 1rem;
            background: var(--sapContent_BadgeBackground);
            border-color: var(--sapContent_BadgeBackground);
            color: var(--sapContent_BadgeTextColor);
            padding: .25rem;
            border-radius: 1rem;
            justify-content: center;
            font-size: var(--sapFontSmallSize);
            margin-inline-start: 0.25rem;
    }
    ```
