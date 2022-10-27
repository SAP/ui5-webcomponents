commit bfb291a0426fe45521939a2d6781a0b9922f2ea6
Author: ilhan orhan <ilhan.myumyun@sap.com>
Date:   Thu Oct 27 12:43:12 2022 +0300

    docs: add Form associated annotations to components API (#5906)
    
    Background. To enable easier generation of Angular wrappers/directives out of UI5 Web Components in terms of Angular Form support, we need to append more information to our existing API JSDoc (and to the generated api.json), such as what properties are Form related, what events are related to the change of Form related properties.
    The PR introduces the following annotations:
    - New prop level annotation @formProperty - describes the form associated properties for form submission
    - New prop level annotation @formEvents - describes the event(s), fired when a form property changes
