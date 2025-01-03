import html from '!!raw-loader!./sample.html';
import js from '!!raw-loader!./main.js';

To enable row actions, you can use the `TableRowActionBase` components such as `ui5-table-row-action` or `ui5-table-row-action-navigation`. This allows you to add interactive elements to each row, providing users the ability to perform actions related to the row.

The `row-action-count` property of the `ui5-table` component determines the width of the row action column. A maximum value of `3` is recommended, as exceeding this limit may take up too much space on smaller screens. If the number of row actions exceeds the `row-action-count`, an overflow button will appear, providing access to the additional actions.

The `hidden` property of row actions allows you to hide specific row actions while preserving their space. This can be useful for consistent alignment of row actions across different rows.

<Editor html={html} js={js} />
