import html from '!!raw-loader!./sample.html';
import js from '!!raw-loader!./main.js';

Enable single-selection in your table by adding the `<ui5-table-selection-single>` feature.

The selection features of the table is key-based, therefore each row requires a `row-key` attribute to be uniquely identified.

<Editor html={html} js={js} />
