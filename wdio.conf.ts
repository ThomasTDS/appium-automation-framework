import path from 'node:path';
import { globSync } from 'node:fs';
import { config as loadEnv } from 'dotenv';

loadEnv();

// O @wdio/cucumber-framework tem um bug no Windows: ele converte o padrao
// glob passado em `cucumberOpts.require` para uma URL `file://` antes de
// resolve-lo, o que quebra a busca (globSync nao entende uma URL como
// padrao). Por isso a lista de arquivos e resolvida aqui, com o glob
// nativo do Node, e passada ja como caminhos concretos.
const stepDefinitions = globSync('./test/step-definitions/**/*.ts');

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
  // 20s (em vez do padrao de 5s/10s) porque o primeiro boot do app num
  // emulador "frio" (ex.: no CI, onde o AVD acabou de ser criado) demora
  // mais para renderizar a tela inicial do que num emulador local ja
  // aquecido de execucoes anteriores.
  waitforTimeout: 20000,
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
    require: stepDefinitions,
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
