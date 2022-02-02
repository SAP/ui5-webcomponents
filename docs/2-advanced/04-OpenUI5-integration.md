# OpenUI5 Integration

*[OpenUI5](https://openui5.org/) is an open-source framework in the same product family as UI5 Web Components.*

To enable OpenUI5 support:

```js
import "@ui5/webcomponents-base/dist/features/OpenUI5Support.js";
```

If your app uses both OpenUI5 and UI5 Web Components, UI5 Web Components can benefit
from OpenUI5 configuration and resources.

When you import the above module:
- OpenUI5 configuration takes precedence over UI5 Web Components configuration
  for all common entities (theme, language, etc.). In addition, changing the theme
  in OpenUI5 will also change the theme in UI5 Web Components.
- Fonts will not be loaded twice (just once by OpenUI5, and reused).
- Locale data assets will not be fetched twice (just once by OpenUI5, and reused).

Therefore, if you intend to run both frameworks in the same browser window,
it is highly recommended to enable OpenUI5 support and benefit from these optimizations.

Next: [Using the Framework](../other-framework-level-apis)
