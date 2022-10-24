commit 94d16199ed7dc79b21d99a0637533e93af54c90a
Author: ilhan orhan <ilhan.myumyun@sap.com>
Date:   Mon Oct 24 17:43:07 2022 +0300

    fix(framework): fix contexts management in hbs-2-lit compiler (#5958)
    
    The PR addresses several issues with context setting within the lit templates by the HBS-2-lit compiler.
    
    Issues that are resolved with this change:
    - when "@root" is used in HBS template - it will throw an error: invalid or unexpected token
    when trying to access root context from nested loop with "{{../../text}}", it will compile to "{{text}}" ("context.text" would have been correct) and will throw an error
    - After the nested each (level 2) completes, the default context is set the root one "context", but it should be "item" as the execution continues in the top level loop.
    - After the nested each (level 2) completes and trying to access the root context with "{{../text}}" from the top level loop fails as it compiles to "item.text", instead of "context.text".
    - Note: one major issue still remains with the "../" syntax. Even after the change "../" syntax only works when trying to access the root context, as we have only one root context represented by the "context" variable. But when it comes to moving between different levels of loops - it still does not work.
    After the change, parsing {../text}} generates properly "item.text", but "item" points to the wrong object - points to current object not the object of the outer array as shown below
    - There is another BLI for refactoring, where this is described. We need to maintain a stack of contexts and use it when generating the templates to pass the correct one.
    
    FIXES: #4701
