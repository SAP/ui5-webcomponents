commit fe142782d34459d5825f199a67dba4561e2525ce
Author: Petar Dimov <32839090+dimovpetar@users.noreply.github.com>
Date:   Tue Feb 7 11:28:46 2023 +0200

    refactor(ui5-tabcontainer): migrate to TypeScript (#6375)
    
    Created common interface ITab, located in TabContainer.ts. It is implemented by the Tab and TabSeparator classes.
    
    Related to: #4337
