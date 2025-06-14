commit 1cdcdd461484c2a8d801c1f68db8ba5666c8ea0b
Author: Nikola Anachkov <87311182+NakataCode@users.noreply.github.com>
Date:   Fri Jun 13 15:41:10 2025 +0300

    fix(ui5-dynamic-page): remove aria-expanded and aria-label when no header content is present (#11626)
    
    - Only add aria-expanded and aria-label when header content is present to avoid misleading screen readers about non-existent expand/collapse functionality.
    
    Fixes: #11570
