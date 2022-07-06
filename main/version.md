commit 7ea3f49289db03071bf3e9f17b62e035461112d3
Author: Boyan Rakilovski <boyan.rakilovski@sap.com>
Date:   Wed Jul 6 16:54:36 2022 +0300

    fix(ui5-date-picker): adjust background color (#5466)
    
    - The background color is now adjusted when the
    component is disabled or readonly and the value
    state is set to "Error".
    
    Fixes: #5396
