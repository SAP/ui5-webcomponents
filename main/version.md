commit 99498eb66b9f2bb889237a552e183933552f430e
Author: ilhan orhan <ilhan.myumyun@sap.com>
Date:   Thu Jun 30 17:00:49 2022 +0300

    chore: fix event metadata (#5441)
    
    It should be event.detail by spec -> https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/detail.
    
    Luckily, it's not a breaking change as the framework properly fires the event and assigns the data on the "detail" object.
    Also, the "details" does not show up in the API reference.
