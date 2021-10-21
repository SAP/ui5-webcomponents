# Running the UI5 Web Components Playground App Locally

The [deployed](https://sap.github.io/ui5-webcomponents/) playground can be run locally to test your changes and samples.
In order to do so, you have to follow the steps below:

## 1. Install Ruby.
See how to install Ruby depending on your OS [here](https://www.ruby-lang.org/en/downloads/).

**Note:** Some OS might come with built-in Ruby, so you don't have to install it on your own. (To check if Ruby is installed, run ```ruby -v``` in the terminal.)

## 2. Install Bundler.
[Bundler](https://bundler.io/) is a tool for managing dependencies in Ruby. You need to install version 2.02 of Bundler.
In order to install it run:
```bash
gem install bundler -v 2.0.2
```

## 3. Go to the playground package.

## 4. Install all of the playground dependencies.
```bash
bundle install
```

## 5. Go to the project root folder.

## 6. Start the playground locally.
In your terminal, run the following command:
```bash
yarn start:playground
```

This will build all the necessary assets and will start local server on your machine. To access the playground, visit: http://localhost:4000/
