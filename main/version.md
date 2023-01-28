commit 4c88da6bdb1c2ed95ffa619f879d9a71900c797b
Author: ilhan orhan <ilhan.myumyun@sap.com>
Date:   Sat Jan 28 11:44:13 2023 +0200

    chore: change default release from patch to auto
    
    Previously "patch" was the default release type, now it's "auto detected" by default - means lerna will auto detect the commits and perform the required release type
