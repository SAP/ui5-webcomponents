commit 03ecc0bb34f508d9e7492b7c64d70617a4f06694
Author: Plamen Ivanov <plamen.ivanov01@sap.com>
Date:   Fri May 23 15:43:17 2025 +0200

    fix(ui5-checkbox): fixed required asterisk alignment (#11576)
    
    Previously the required asterisk was rendered next to the checkbox's
    text block.
    
    Now it's at the end of the text line.
    
    Fixes: #11547
