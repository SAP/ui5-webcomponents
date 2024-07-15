# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.1.0-rc.0](https://github.com/SAP/ui5-webcomponents/compare/v2.0.1...v2.1.0-rc.0) (2024-07-11)


### Bug Fixes

* **ui5-table:** access interactive content inside popin cell ([#9428](https://github.com/SAP/ui5-webcomponents/issues/9428)) ([60c5b98](https://github.com/SAP/ui5-webcomponents/commit/60c5b98845b56295306d6aeaf7a0b0933599c737)), closes [#9288](https://github.com/SAP/ui5-webcomponents/issues/9288)
* **ui5-table:** correct announced row count ([#9442](https://github.com/SAP/ui5-webcomponents/issues/9442)) ([011815b](https://github.com/SAP/ui5-webcomponents/commit/011815b8cdd8318d61e61e68cb571fd09a40f2b2))
* **ui5-table:** correct font weight ([#9417](https://github.com/SAP/ui5-webcomponents/issues/9417)) ([9cc7aeb](https://github.com/SAP/ui5-webcomponents/commit/9cc7aeb3baa927518f9cb4eea10698e6297b58a8)), closes [#9046](https://github.com/SAP/ui5-webcomponents/issues/9046)
* **ui5-table:** correct load-more event on mode change ([#9434](https://github.com/SAP/ui5-webcomponents/issues/9434)) ([55aa134](https://github.com/SAP/ui5-webcomponents/commit/55aa13481ad69703032f48fe16ad8f7f148a7967))





## [2.0.1](https://github.com/SAP/ui5-webcomponents/compare/v2.0.0...v2.0.1) (2024-07-05)

**Note:** Version bump only for package @ui5/webcomponents-compat





# [2.0.0](https://github.com/SAP/ui5-webcomponents/compare/v2.0.0-rc.6...v2.0.0) (2024-07-03)


### Features

* add property initializers ([#8846](https://github.com/SAP/ui5-webcomponents/issues/8846)) ([eef0cc9](https://github.com/SAP/ui5-webcomponents/commit/eef0cc9b663fda6268b98e516ed46439435fa2b0))


### BREAKING CHANGES

* @property decorator must be adapted according to new type parameter





# [2.0.0-rc.6](https://github.com/SAP/ui5-webcomponents/compare/v2.0.0-rc.5...v2.0.0-rc.6) (2024-06-17)


### Features

* **ui5-grid:** implementing new grid component ([#8362](https://github.com/SAP/ui5-webcomponents/issues/8362)) ([04d291d](https://github.com/SAP/ui5-webcomponents/commit/04d291dc368b884d9001e875441c54cf56e21d1a))





# [2.0.0-rc.5](https://github.com/SAP/ui5-webcomponents/compare/v2.0.0-rc.4...v2.0.0-rc.5) (2024-06-06)

**Note:** Version bump only for package @ui5/webcomponents-compat





# [2.0.0-rc.4](https://github.com/SAP/ui5-webcomponents/compare/v2.0.0-rc.3...v2.0.0-rc.4) (2024-05-29)

**Note:** Version bump only for package @ui5/webcomponents-compat





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
