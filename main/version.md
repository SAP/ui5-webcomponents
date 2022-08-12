commit bbc9246647854a4a509a6fe9c368cfd89a9cddb9
Author: gmkv <georgi.minkov@sap.com>
Date:   Fri Aug 12 15:20:41 2022 +0300

    fix(ui5-tabcontainer): update tab strip on tab selection (#5449)
    
    - Tabs are rearranged on the tab strip when a tab is selected programmatically.
    - Updated documentation for getTabInStripDomRef to clarify use
    with nested tabs.
    - Refactored component and stabilized keyboard navigation
    
    Fixes #5172
    Part of #5116
