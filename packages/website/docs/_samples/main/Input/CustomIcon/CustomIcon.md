```html title="example.html"
<ui5-input value="Some initial value" show-clear-icon >
    <ui5-icon id="custom-icon" name="search" slot="icon"></ui5-icon>
</ui5-input>
<script type="module">
    import inputCss from "@ui5/webcomponents/dist/styles/InputIcon.module.css";

    const icon = document.getElementById("custom-icon");
    icon.classList.add(inputCss["input-icon"]);
</script>
```
