commit ac385052898d78dc12ebf0a0b3f261446f4687b8
Author: Nikola Anachkov <87311182+NakataCode@users.noreply.github.com>
Date:   Fri Sep 12 15:23:08 2025 +0300

    fix(ui5-shellbar): correct spacing after expanded search field (#12298)
    
    Remove problematic CSS selector that was removing margin from buttons positioned after the search field when expanded, causing missing 8px spacing.
    
    Fixes: DINC0627273
