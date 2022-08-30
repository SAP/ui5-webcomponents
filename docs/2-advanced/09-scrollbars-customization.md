# Scrollbars customization

By default some of the components provide additional CSS styles, which are applied to their scrollbars, in order to achieve their target design.

## Setting default scrollbar styles to components

To use native scrollbar styles, you have to add the CSS style class `.ui5-content-native-scrollbars` on the body element of your application.

**Note: Because of some browser restrictions this setting takes affect if it is applied before the initial rendering of the compontents, which are using it.**

Example 1:
```
<body class="ui5-content-native-scrollbars">
    ...
</body>
```

