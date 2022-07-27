commit 816edf048ddeb67bc6332d85d38bb93431a6b1fb
Author: Stanislav Bodurov <stbodurov@icloud.com>
Date:   Wed Jul 27 15:39:48 2022 +0300

    feat(ui5-avatar): introduce badge support (#5418)
    
    The Avatar now supports visual affordance using a new `badge` slot:
    
    ```js
    <ui5-avatar initials="AB" color-scheme="Accent1">
            <ui5-badge slot="badge">
                    <ui5-icon slot="icon" name="accelerated"></ui5-icon>
            </ui5-badge>
    </ui5-avatar>
    ```
    
    **Note:** To achieve the target design, please use only `ui5-icon`
    in the corresponding slot of `ui5-badge`, without text nodes.
