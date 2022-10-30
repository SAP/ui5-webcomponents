commit f8e1033643626261dcad8a38f65c325ba9aff99f
Author: Stoyan <88034608+hinzzx@users.noreply.github.com>
Date:   Sun Oct 30 20:08:42 2022 +0200

    feat(framework): fetch illustrations on demand (#5927)
    
    With this change Illustrations for the IllustratedMessage component could now:
    
    * Be fetched on demand, and it wont be necessary to inline import every single illustration;
    * Illustration imports are now dynamically generated;
    * bundle.esm.js file simplified in size;
