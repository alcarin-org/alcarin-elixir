# Alcarin Frontend

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

You can find information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Table of Contents

- [Developing Components](#Storybook)
- [Available Scripts](#available-scripts)
  - [yarn start](#yarn-start)
  - [yarn test](#yarn-test)
  - [yarn run storybook](#yarn-run-storybook)
  - [yarn run build](#yarn-run-build)
  - [yarn run build-storybook](#yarn-run-build-storybook)
  - [yarn run analyze](#yarn-run-analyze)
  - [yarn run storybook](#yarn-run-storybook)

## Developing Components

Usually, in an app, you have a lot of UI components, and each of them has many different states.
For an example, a simple button component could have following states:

* In a regular state, with a text label.
* In the disabled mode.
* In a loading state.

Usually, it’s hard to see these states without running a sample app or some examples.<br>
In Alcarin the [Storybook](https://storybook.js.org/) tool has been incorporated to overcome the problem.

![Storybook for React Demo](http://i.imgur.com/7CIAWpB.gif)

The preferred working flow is to develop our components in stories and when their ready include it in the project.<br>
Check `[yarn run storybook](#yarn-run-storybook) command for instruction usage.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](#running-tests) for more information.

### `yarn run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

### `yarn run storybook`

Run Alcarin [Storybook](#developing-components).<br>
Open [http://localhost:9009](http://localhost:3000) to view it in the browser.

### `yarn run build-storybook`

Builds the storybook for static deployment to the `storybook-static` folder.<br>
This command is not needed in typical working flow.

### `yarn run analyze`

[Source map explorer](https://www.npmjs.com/package/source-map-explorer) analyzes
JavaScript bundles using the source maps. This helps you understand where code
bloat is coming from.

Before call analyzer you need to prepare production build. Check [yarn-run-build](#yarn-run-build)
