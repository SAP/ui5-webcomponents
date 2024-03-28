commit 3da1e47cd57addab037e7b637966571d2208441a
Author: kskondov <konstantin.kondov@sap.com>
Date:   Thu Mar 28 17:21:18 2024 +0200

    refactor(ui5-tabcontainer): rename `tabs-overflow-mode` to `overflow-mode` (#8565)
    
    Renames tabs-overflow-mode to overflow-mode
    
    BREAKING CHANGE: If you have previously used:
    ```html
    <ui5-tabcontainer tabs-overflow-mode="StartAndEnd"></ui5-tabcontainer>
    ```
    Now use:
    ```html
    <ui5-tabcontainer overflow-mode="StartAndEnd"></ui5-tabcontainer>
    ```
    
    Relates to https://github.com/SAP/ui5-webcomponents/issues/8461
