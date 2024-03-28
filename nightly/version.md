commit 3141327366e6b274e86e17519aadd660813048da
Author: Plamen Ivanov <plamen.ivanov01@sap.com>
Date:   Thu Mar 28 17:44:38 2024 +0200

    fix(ui5-illustrated-message): vertical alignment (#8566)
    
    Recent DOT feature led to improper vertical alignment of Illustrated
    Message's SVG when the IM is inside tall container.
    Now we make sure both the text and the SVG container are vertically
    centered in case of tall container.
    Fixes: #8490
