# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.0.0-rc.3](https://github.com/SAP/ui5-webcomponents/compare/v2.0.0-rc.2...v2.0.0-rc.3) (2024-05-10)


### Code Refactoring

* **ui5-table:** move Table to `@ui5/webcomponents-compat` ([#8849](https://github.com/SAP/ui5-webcomponents/issues/8849)) ([779bcdc](https://github.com/SAP/ui5-webcomponents/commit/779bcdcaff6693252d0a8b69b886bf7b939c7887))


### BREAKING CHANGES

* **ui5-table:** If you previously used the Table from `@ui5/webcomponents`, you need to import it from @ui5/webcomponents-compat:
```ts
import "@ui5/webcomponents-compat/dist/Table.js"; // ui5-table
import "@ui5/webcomponents-compat/dist/TableColumn.js"; // ui5-table-column
import "@ui5/webcomponents-compat/dist/TableRow.js"; // ui5-table-row`
import "@ui5/webcomponents-compat/dist/TableGroupRow.js";` // ui5-table-group-row
import "@ui5/webcomponents-compat/dist/TableCell.js"; // ui5-table-cell
```

Related to: https://github.com/SAP/ui5-webcomponents/issues/8461
