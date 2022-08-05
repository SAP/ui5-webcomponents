# Scrollbars customization

By default some of the components provide additional CSS styles, which are applied to their scrollbars, in order to achieve their target design.

## Setting default scrollbar styles to components

To use native scrollbar styles, you have to add the HTML attribute `data-ui5-native-scrollbars` or CSS style class `.ui5-content-native-scrollbars` on the component itself, the body, html or any other relevant region of your application.

**Note: Because of some browser restrictions this setting takes affect if it is applied before the initial rendering of the compontents, which are using it.**

Example 1:
```
<body data-ui5-native-scrollbars>
    ...
</body>
```

Example 2:
```
<body>
    <div class="ui5-content-native-scrollbars">
        <ui5-list>
            ...
        </ui5-list>
    </div>

    <ui5-list class="ui5-content-native-scrollbars">
        ...
    </ui5-list>
</body>
```

