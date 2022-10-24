commit ca992b28de371068a64485eab7678fa8aadd3d31
Author: ilhan orhan <ilhan.myumyun@sap.com>
Date:   Mon Oct 24 16:38:29 2022 +0300

    build: generate api.json for base package (#5959)
    
    Let's start generating api.json for the base package as well - there are classes, especially data types used within components, for example (valueState, type: ValueState). This way, the API picture will be more complete.
