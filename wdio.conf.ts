import path from 'node:path';
import { config as loadEnv } from 'dotenv';

loadEnv();

// Caminho do APK do app sob teste. O arquivo nao fica versionado no
// repositorio (ver .gitignore); cada pessoa que for rodar os testes baixa o
// APK e aponta o caminho via variavel de ambiente ANDROID_APP_PATH, ou
// coloca o arquivo em ./apps e usa o valor padrao abaixo.
const androidAppPath = process.env.ANDROID_APP_PATH ?? path.resolve('./apps/android-demo-app.apk');

// A tipagem `Options.Testrunner` do pacote @wdio/types (versao 9.31.2) esta
// sem o campo `capabilities` em sua definicao, embora ele seja obrigatorio
// em tempo de execucao (aparenta ser uma defasagem de versao entre os
// pacotes do monorepo do WebdriverIO). Por isso o objeto de config abaixo
// e exportado sem anotacao de tipo explicita, deixando o TypeScript inferir
// a forma a partir do literal.
export const config = {
  runner: 'local',

  specs: ['./test/features/**/*.feature'],
  exclude: [],

  maxInstances: 1,

  capabilities: [
    {
      platformName: 'Android',
      'appium:automationName': 'UiAutomator2',
      'appium:deviceName': process.env.ANDROID_DEVICE_NAME ?? 'medium_phone',
      'appium:avd': process.env.ANDROID_AVD_NAME ?? 'medium_phone',
      'appium:app': androidAppPath,
      'appium:newCommandTimeout': 240,
      'appium:autoGrantPermissions': true,
    },
  ],

  logLevel: 'info',
  bail: 0,
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,

  services: [
    [
      'appium',
      {
        command: 'appium',
      },
    ],
  ],

  framework: 'cucumber',
  reporters: [
    'spec',
    [
      'allure',
      {
        outputDir: 'allure-results',
        disableWebdriverStepsReporting: false,
        disableWebdriverScreenshotsReporting: false,
      },
    ],
  ],

  cucumberOpts: {
    require: ['./test/step-definitions/**/*.ts'],
    backtrace: false,
    requireModule: [],
    dryRun: false,
    failFast: false,
    snippets: true,
    source: true,
    strict: false,
    tagExpression: '',
    timeout: 60000,
    ignoreUndefinedDefinitions: false,
  },
};
