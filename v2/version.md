commit 37cb9d3d474cd500b8578dc77eb48de6f083155f
Author: kskondov <konstantin.kondov@sap.com>
Date:   Thu Mar 28 17:09:21 2024 +0200

    refactor(ui5-tab): rename `subTabs` slot  to `items` (#8559)
    
    Renames 'subTabs' slot of ui5-tab to 'items'.
    
    BREAKING CHANGE: If you have previously used:
    ```html
    <ui5-tab id="nestedTab" slot="subTabs"></ui5-tab>
    ```
    Now use:
    ```html
    <ui5-tab id="nestedTab" slot="items"></ui5-tab>
    ```
    
    Relates to https://github.com/SAP/ui5-webcomponents/issues/8461
