commit e6dde745def7b2e9e51e1a9c94fa7d250679a5d2
Author: ilhan orhan <ilhan.myumyun@sap.com>
Date:   Tue Feb 7 17:17:26 2023 +0200

    chore(ResizeHandler): accept async resize handlers (#6437)
    
    There are use-cases to register an async resize handler in several components (SegmentedButton, TabContainer) and currently the ResizeHandler.register accepts only sync ones. In order to allow registration of async functions:
    - change **ResizeObserverCallback** type to accept async functions
    - export the **ResizeObserverCallback** type and adopt ResizeObserverCallback in all components using the ResizeHandler
