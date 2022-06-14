commit d1768002379476d94ee8e43db4ff300f28aa2a3b
Author: Stanislav Bodurov <stbodurov@icloud.com>
Date:   Tue Jun 14 09:32:29 2022 +0100

    fix(ui5-avatar-group): adapt width calculations in composite layouts (#5357)
    
    The calculations of the main container width have been adjusted to take into account sibling nodes.
    
    Fixes #5333
