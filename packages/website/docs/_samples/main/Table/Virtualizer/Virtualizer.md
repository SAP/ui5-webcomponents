import html from '!!raw-loader!./sample.html';
import js from '!!raw-loader!./main.js';

Enhance your Table with virtualization capabilities by incorporating the **Virtualizer** feature.

When dealing with virtualization in a table, the concept of `range-change` event with `first` and `last` parameters is crucial for understanding which rows are currently visible and need to be rendered. It is also essential to set specific attributes to ensure proper virtualization. These attributes are:

1. `row-count` for the Table: This attribute specifies the total number of rows in the table. It helps the virtualizer understand how many rows it needs to manage.

2. `row-height` for the Table: This attribute defines the height of each row in the table. Consistent row height allows the virtualizer to calculate which rows are currently visible and need to be rendered.

3. `position` for the TableRow: This attribute determines the position of each row within the table. Proper positioning ensures that rows are rendered in the correct location as the user scrolls.

By setting these attributes and handling the `range-change` event properly, the TableVirtualizer can efficiently manage and render only the visible rows, improving performance and reducing memory usage.

<Editor html={html} js={js} />
