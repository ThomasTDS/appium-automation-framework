# Appium Automation Framework

[🇧🇷 Português](README.md) | **🇺🇸 English**

![CI](https://github.com/ThomasTDS/appium-automation-framework/actions/workflows/ci.yml/badge.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node.js](https://img.shields.io/badge/node-%3E%3D18.20.0-brightgreen.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-6.x-3178c6.svg)

End-to-end test automation framework for Android applications, built with **Appium**, **WebdriverIO**, and **TypeScript**, following the **BDD** (Behavior Driven Development, with Cucumber) and **Page Object Model** patterns.

This is a portfolio project, developed to demonstrate, in practice, mobile test automation skills: defining scenarios in business language, sustainable code organization, running on an Android emulator, and continuous integration.

![Demo of the suite running the purchase flow on the Android emulator](docs/demo.gif)

<sub>Real recording of the checkout scenario (`npm test`) running against the Android emulator: login, adding to cart, filling in the shipping address and payment, through order confirmation.</sub>

## Table of contents

- [About the project](#about-the-project)
- [Technologies and tools](#technologies-and-tools)
- [Project structure](#project-structure)
- [Application under test](#application-under-test)
- [Prerequisites](#prerequisites)
- [Environment setup](#environment-setup)
- [Installation](#installation)
- [Running the tests](#running-the-tests)
- [Test report (Allure)](#test-report-allure)
- [Troubleshooting](#troubleshooting)
- [Code quality standards](#code-quality-standards)
- [Continuous integration](#continuous-integration)
- [Implemented test scenarios](#implemented-test-scenarios)
- [Bugs found](#bugs-found)
- [Reporting issues](#reporting-issues)
- [Changelog](#changelog)
- [License](#license)
- [Author](#author)

## About the project

The goal of this repository is to simulate, as closely to reality as possible, a mobile test automation project maintained by a QA (Quality Assurance) team. To that end, tests are written in **Gherkin** format (given/when/then), organized into reusable Page Objects, and run automatically on every code change through a continuous integration pipeline on GitHub Actions.

The application used as the test target is [My Demo App](https://github.com/saucelabs/my-demo-app-android), a fictional e-commerce Android application maintained by Sauce Labs specifically for test automation training and demonstration purposes.

## Technologies and tools

| Category                 | Tool                                                                        |
| ------------------------ | --------------------------------------------------------------------------- |
| Language                 | TypeScript                                                                  |
| Automation framework     | [WebdriverIO](https://webdriver.io/)                                        |
| Mobile automation driver | [Appium](https://appium.io/) (UiAutomator2 driver)                          |
| Test writing style       | BDD with [Cucumber](https://cucumber.io/) (scenarios written in Portuguese) |
| Organization pattern     | Page Object Model                                                           |
| Execution report         | [Allure Report](https://allurereport.org/)                                  |
| Code quality             | ESLint and Prettier                                                         |
| Continuous integration   | GitHub Actions                                                              |
| Platform under test      | Android (emulator via Android Studio)                                       |

## Project structure

```
.
├── .github/workflows/       # Continuous integration pipeline
├── apps/                    # Where the APK of the app under test should be placed
├── docs/                    # Images/GIFs used in this README
├── test/
│   ├── features/            # Test scenarios in Gherkin (.feature)
│   ├── pageobjects/         # Page Objects (base class + app screens)
│   └── step-definitions/    # Binding between Gherkin steps and Page Objects
├── wdio.conf.ts             # WebdriverIO/Appium configuration
├── tsconfig.json            # TypeScript configuration
├── eslint.config.mjs        # ESLint configuration
└── .env.example             # Environment variables template
```

## Application under test

Tests run against **My Demo App Android**, by Sauce Labs: a fictional e-commerce application with login, a product catalog, shopping cart, and several other demo features (QR Code, geolocation, biometrics, among others).

- Official repository: [saucelabs/my-demo-app-android](https://github.com/saucelabs/my-demo-app-android)
- Android package: `com.saucelabs.mydemoapp.android`
- Demo credentials used in the tests: username `bod@example.com`, password `10203040`

The `.apk` file is **not version-controlled** in this repository (see the [Installation](#installation) section for download instructions).

## Prerequisites

Before running the tests locally, you need to have the following installed:

- [Node.js](https://nodejs.org/) 18.20 or higher
- [JDK (Java Development Kit)](https://adoptium.net/) 17 or higher
- [Android Studio](https://developer.android.com/studio), with:
  - Android SDK (Platform-Tools, Build-Tools, Platform, and Emulator)
  - An Android Virtual Device (AVD) already created and working

The following environment variables also need to be configured on your operating system:

| Variable                               | Description                   |
| -------------------------------------- | ----------------------------- |
| `JAVA_HOME`                            | JDK installation path         |
| `ANDROID_HOME` (or `ANDROID_SDK_ROOT`) | Android SDK installation path |

Your system `PATH` must include the Android SDK's `platform-tools` and `emulator` folders, so that the `adb` and `emulator` commands work directly from the terminal.

## Environment setup

1. Copy the example environment variables file:

   ```bash
   cp .env.example .env
   ```

2. Adjust the values in `.env` if needed:

   | Variable              | Default                       | Description                                    |
   | --------------------- | ----------------------------- | ---------------------------------------------- |
   | `ANDROID_APP_PATH`    | `./apps/android-demo-app.apk` | Path to the APK of the application under test  |
   | `ANDROID_DEVICE_NAME` | `medium_phone`                | Device name used by Appium                     |
   | `ANDROID_AVD_NAME`    | `medium_phone`                | Name of the virtual device (AVD) to be started |

   The AVD name must match a virtual device already created in your Android Studio (**Device Manager**). If you use a name other than `medium_phone`, update these variables accordingly.

## Installation

1. Clone the repository:

   ```bash
   git clone git@github.com:ThomasTDS/appium-automation-framework.git
   cd appium-automation-framework
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Download the APK of the application under test and place it in the `apps/` folder:

   ```bash
   curl -L -o ./apps/android-demo-app.apk \
     https://github.com/saucelabs/my-demo-app-android/releases/download/2.2.0/mda-2.2.0-25.apk
   ```

   > The command above points to version `2.2.0` (the latest at the time this project was written). If a newer version has since been released, check the exact `.apk` file name in the [my-demo-app-android releases](https://github.com/saucelabs/my-demo-app-android/releases) and adjust the command's URL accordingly.

4. Start the Android emulator configured in Android Studio (or let Appium start it automatically on the first test run, via the `ANDROID_AVD_NAME` variable).

## Running the tests

With the environment set up, simply run:

```bash
npm test
```

This command automatically starts the Appium server (via `@wdio/appium-service`), connects to the Android emulator, and runs every scenario defined in `test/features/`.

## Test report (Allure)

On each run, results are recorded in the `allure-results/` folder. To view them as a browsable HTML report:

```bash
# Generates the HTML report from the latest run's results
npm run report:generate

# Opens the generated report in the browser
npm run report:open
```

The report includes each scenario's steps, execution time, and screenshots on failure.

The report from the most recent run on the `main` branch is also published automatically, with nothing to generate locally: **[view the live Allure report](https://thomastds.github.io/appium-automation-framework/)**.

## Troubleshooting

**The emulator window opens but is black/frozen, even though the tests pass normally.**

This is usually a host GPU rendering issue (common on laptops with hybrid graphics, e.g., dedicated NVIDIA + integrated Intel), not a problem with the application or the tests — since Appium interacts with the app through the Android accessibility tree rather than screen pixels, the suite keeps working normally even with a black screen. To force the emulator to render via software (slower, but more compatible) and confirm the diagnosis, start it manually with:

```bash
emulator -avd medium_phone -gpu swiftshader_indirect
```

If the screen starts displaying Android normally, the issue lies with the host's GPU driver/configuration. It's worth trying to update the dedicated graphics card driver and/or disabling "Hardware-accelerated GPU scheduling" in Windows' graphics settings before permanently relying on software rendering.

## Code quality standards

```bash
# Checks for lint issues
npm run lint

# Automatically fixes what it can
npm run lint:fix

# Checks code formatting
npm run format:check

# Automatically formats the code
npm run format

# Checks TypeScript type errors
npm run typecheck
```

These three checks (lint, formatting, and types) run automatically in a dedicated CI job on every `push` or _pull request_, independently and in parallel with the end-to-end test run.

Lint, formatting (only on changed files, via [lint-staged](https://github.com/lint-staged/lint-staged)), and type checking also run locally before every commit, through a pre-commit hook configured with [Husky](https://typicode.github.io/husky/). The hook is installed automatically when running `npm install`.

## Continuous integration

On every `push` or _pull request_ to the `main` branch, the workflow defined in [`.github/workflows/ci.yml`](.github/workflows/ci.yml) automatically runs the entire test suite on an Android emulator hosted on GitHub Actions, and publishes the Allure report as a workflow artifact, available for download in the repository's **Actions** tab. In addition, on every direct `push` to `main`, the report is automatically published to GitHub Pages: [thomastds.github.io/appium-automation-framework](https://thomastds.github.io/appium-automation-framework/).

## Implemented test scenarios

| Feature     | Scenario                                           | File                                                                     |
| ----------- | -------------------------------------------------- | ------------------------------------------------------------------------ |
| Login       | Login with valid credentials                       | [`test/features/login.feature`](test/features/login.feature)             |
| Login       | Login with a locked-out user                       | [`test/features/login.feature`](test/features/login.feature)             |
| Login       | Login with required fields left blank (3 examples) | [`test/features/login.feature`](test/features/login.feature)             |
| Cart        | Add a product to the cart                          | [`test/features/carrinho.feature`](test/features/carrinho.feature)       |
| Cart        | Attempt checkout while not logged in               | [`test/features/carrinho.feature`](test/features/carrinho.feature)       |
| Cart        | Remove a product from the cart                     | [`test/features/carrinho.feature`](test/features/carrinho.feature)       |
| Cart        | Adjust the quantity before adding to the cart      | [`test/features/carrinho.feature`](test/features/carrinho.feature)       |
| Cart        | Adding the same product twice sums the quantity    | [`test/features/carrinho.feature`](test/features/carrinho.feature)       |
| Checkout    | Successfully complete a purchase                   | [`test/features/checkout.feature`](test/features/checkout.feature)       |
| QR Code     | Open the QR Code reader                            | [`test/features/qrcode.feature`](test/features/qrcode.feature)           |
| Drawing     | Draw on the pad and save                           | [`test/features/drawing.feature`](test/features/drawing.feature)         |
| Geolocation | Setting the location reflects on screen            | [`test/features/geolocation.feature`](test/features/geolocation.feature) |
| Biometrics  | Screen indicates unavailability on the device      | [`test/features/fingerprint.feature`](test/features/fingerprint.feature) |

This list is updated as new scenarios are added to the project.

## Bugs found

Real defects in the application under test, discovered while developing the scenarios and logged as GitHub Issues with reproduction steps, evidence, and root-cause analysis.

| Issue                                                                     | Summary                                                                                                          | Severity |
| ------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | -------- |
| [#22](https://github.com/ThomasTDS/appium-automation-framework/issues/22) | Login accepts any username/password, except for emails on the lockout list — the password isn't validated at all | Critical |

## Reporting issues

Bugs found in the application under test, in the CI pipeline, or in the automation itself are logged as [GitHub Issues](../../issues/new/choose), using a standardized template that covers environment, severity, priority, reproduction steps, and root cause.

## Changelog

The history of notable changes to this project is kept in [`CHANGELOG.md`](CHANGELOG.md).

## License

This project is licensed under the terms of the MIT license. See the [LICENSE](LICENSE) file for more details.

## Author

Developed by [Thomas Teixeira](https://github.com/ThomasTDS) as a study and portfolio project in mobile test automation.
