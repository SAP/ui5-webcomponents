<h3 class="comment-api-title">Overview</h3>

The <code>ui5-list</code> component allows displaying a list of items, advanced keyboard handling support for navigating between items, and predefined modes to improve the development efficiency. <br/><br/> The <code>ui5-list</code> is a container for the available list items: <ul> <li><code>ui5-li</code></li> <li><code>ui5-li-custom</code></li> <li><code>ui5-li-groupheader</code></li> </ul> <br/><br/> To benefit from the built-in selection mechanism, you can use the available selection modes, such as <code>SingleSelect</code>, <code>MultiSelect</code> and <code>Delete</code>. <br/><br/> Additionally, the <code>ui5-list</code> provides header, footer, and customization for the list item separators.

<br/><br/> <h3>Keyboard Handling</h3>

<h4>Basic Navigation</h4> The <code>ui5-list</code> provides advanced keyboard handling. When a list is focused the user can use the following keyboard shortcuts in order to perform a navigation: <br/>

<ul>
  {" "}
  <li>[UP/DOWN] - Navigates up and down the items</li> <li>
    [HOME] - Navigates to first item
  </li> <li>[END] - Navigates to the last item</li>{" "}
</ul>

The user can use the following keyboard shortcuts to perform actions (such as select, delete), when the <code>mode</code> property is in use: <ul> <li>[SPACE] - Select an item (if <code>type</code> is 'Active') when <code>mode</code> is selection</li> <li>[DELETE] - Delete an item if <code>mode</code> property is <code>Delete</code></li> </ul>

<h4>Fast Navigation</h4> This component provides a build in fast navigation group which can be used via <code>F6 / Shift + F6</code> or <code> Ctrl + Alt(Option) + Down / Ctrl + Alt(Option) + Up</code>. In order to use this functionality, you need to import the following module: <code>import "@ui5/webcomponents-base/dist/features/F6Navigation.js"</code> <br/><br/>

<h3>ES6 Module Import</h3>

<code>import "@ui5/webcomponents/dist/List.js";</code> <br/> <code>import "@ui5/webcomponents/dist/StandardListItem.js";</code> (for <code>ui5-li</code>) <br/> <code>import "@ui5/webcomponents/dist/CustomListItem.js";</code> (for <code>ui5-li-custom</code>) <br/> <code>import "@ui5/webcomponents/dist/GroupHeaderListItem.js";</code> (for <code>ui5-li-groupheader</code>)
