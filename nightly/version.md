commit 95e81ab9cfe1de07972e5e13679d3e1f42a21aaa
Author: Nikola Anachkov <87311182+NakataCode@users.noreply.github.com>
Date:   Fri May 30 15:42:15 2025 +0200

    fix(ui5-avatar-group): focus outline visible in overflow:hidden (#11535)
    
    Problem:
    Focus outline is cut off when the avatar-group is placed inside a container with overflow:hidden.
    
    Solution:
    Added padding to the avatar group container using a new parameter --_ui5_avatar_group_focus_space. This ensures sufficient space for the focus outline to be fully visible.
    
    Fixes: #10551
