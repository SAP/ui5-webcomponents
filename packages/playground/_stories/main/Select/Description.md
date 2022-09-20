<h3 class="comment-api-title">Overview</h3> The <code>ui5-select</code> component
is used to create a drop-down list. The items inside the <code>ui5-select</code> define
the available options by using the <code>ui5-option</code> component.

<h3>Keyboard Handling</h3> The <code>ui5-select</code> provides advanced keyboard handling. <br/> <ul> <li>[F4, ALT+UP, ALT+DOWN, SPACE, ENTER] - Opens/closes the drop-down.</li> <li>[UP, DOWN] - If the drop-down is closed - changes selection to the next or the previous option. If the drop-down is opened - moves focus to the next or the previous option.</li> <li>[SPACE, ENTER] - If the drop-down is opened - selects the focused option.</li> <li>[ESC] - Closes the drop-down without changing the selection.</li> <li>[HOME] - Navigates to first option</li> <li>[END] - Navigates to the last option</li> </ul> <br/>

<h3>ES6 Module Import</h3> <code>import "@ui5/webcomponents/dist/Select";</code> <br/> <code>import "@ui5/webcomponents/dist/Option";</code> (comes with <code>ui5-select</code>)