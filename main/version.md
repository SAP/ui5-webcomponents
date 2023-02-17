commit 83b4b264a5b8c73a26520e48f9f061f0ab1b9167
Author: ilhan orhan <ilhan.myumyun@sap.com>
Date:   Fri Feb 17 17:12:54 2023 +0200

    chore: prefer import type when importing types (#6533)
    
    There are some imports left that don't follow the conventions to use import type when something is needed, used as a type or it's exported as a type. The PR addresses this.
