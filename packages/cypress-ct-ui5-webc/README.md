# Cypress Component Testing for UI5 Web Components

This package provides configuration to test UI5 Web Components with TSX.

## Getting started

To install, run:

```bash
npm install -D @ui5/cypress-ct-ui5-webc
```

Once you have the package installed alongside Cypress, you can run `npx cypress open`, choose "Component Testing", and "UI5 Web Components with JSX" should appear in the list of frameworks available.

Learn more about [third-party definitions](https://docs.cypress.io/guides/component-testing/third-party-definitions)

## Configuration

Add `@ui5/cypress-ct-ui5-webc` framework to your `cypress.config.{ts,js}` file

```ts
export default defineConfig({
  component: {
    devServer: {
      framework: '@ui5/cypress-ct-ui5-webc',
      bundler: 'vite',
      // more config here
    }
  }
})
```
If you're using TypeScript, you may get a type error when setting the framework property. If so, you'll need to typecast it as `any`

```ts
framework: '@ui5/cypress-ct-ui5-webc' as any,
```
## Adding mount Command

Next, add the following lines to your `component.ts`

```ts
import { mount } from '@ui5/cypress-ct-ui5-webc'

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Mount your template/component into Cypress sandbox
       * @param template
       * @param options render options for custom rendering
       */
      mount: typeof mount;
    }
  }
}

Cypress.Commands.add('mount', mount)
```