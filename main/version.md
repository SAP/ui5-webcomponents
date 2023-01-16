commit 237d113bf6ed189e97a00cf4c557bf57740b4ead
Author: ilhan orhan <ilhan.myumyun@sap.com>
Date:   Mon Jan 16 16:18:29 2023 +0200

    chore: remove ts-ignore on migrated components imports (#6280)
    
    We used to have temp types for components that haven't been migrated to TS. Now as they are in TS, we can directly use them and remove the "ts-ignore" comments on those component imports any temp types created meanwhile.
