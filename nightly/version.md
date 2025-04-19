commit d07b0891ef3f3e6c60354e07c9c12433ce1f14d5
Author: Plamen Ivanov <plamen.ivanov01@sap.com>
Date:   Thu Apr 17 16:41:38 2025 +0200

    fix(ui5-breadcrumbs): dropdown arrow focused color fixed (#11362)
    
    Bug description: When we have dropdown arrow (when there is not enough
    space for all the links) and we focus it, the color of the arrow and
    triple dots remains bluish. It should become white.
    
    This change fixes the issue by improving the CSS selector for making
    the focused color to be bright.
