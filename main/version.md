commit 9b33badec6b5fbbef525fb68366f9bf785e9efef
Author: gmkv <georgi.minkov@sap.com>
Date:   Wed Jun 22 11:42:34 2022 +0300

    fix(ui5-card): refactor header to avoid nesting interactive elements (#5301)
    
    The header now always has role="group".
    An inner element inside the header is now receiving the focus, while the
    focus outline is still drawn on the header element.
    This helps the case when the header is interactive,
    to avoid nesting a button element within a role="button" div.
    
    Adopted approach from https://github.com/SAP/openui5/commit/67a5f79c8ac65ea3b59139fd8479474580318957
    
    Adjusted the status text style slightly to match the latest design spec.
