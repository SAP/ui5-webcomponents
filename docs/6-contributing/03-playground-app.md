# Running the UI5 Web Components Playground App Locally

The [deployed](https://sap.github.io/ui5-webcomponents/) playground can be run locally to test your changes and samples.
In order to do so, you have to follow the steps below:

## 1. Install dependencies.
In the root directory run: 
```bash
yarn install
```

## 2. Build the project Bundler.
```bash
yarn build #this is necessary only once.
```

Or if you want to test your changes live in storybook, run:

```bash
yarn start
```

## 3. Go to the playground package.
```bash
cd packages/playground
```

## 4. Start the playground locally
In your terminal, run the following command:

```bash
yarn storybook
```

This will build all the necessary assets and will start local server on your machine. To access the playground, visit: http://localhost:6006/
