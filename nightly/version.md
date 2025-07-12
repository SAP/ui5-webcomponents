commit 95e00fdd299004bf5cb5e5cbd6fd95f130a94795
Author: Konstantin Gogov <konstantin.gogov@sap.com>
Date:   Fri Jul 11 13:25:54 2025 +0300

    fix(ui5-li): move default slot documentation from class to property level (#11898)
    
    The default slot documentation was moved from the class-level JSDoc
    comments to the actual slot property declaration for better clarity and
    consistency.
    
    This change improves documentation structure while maintaining the same
    functional behavior - the slot is still defined with `type: Node` and
    `"default": true`, which ensures that text content changes will properly
    trigger component invalidation as expected for Node-type slots.
    
    Relates to #11825
