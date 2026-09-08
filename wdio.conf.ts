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
      // A splash screen do app transiciona pra MainActivity rapido demais:
      // o UiAutomator2 espera a SplashActivity (activity de lancamento
      // declarada no manifest) ficar em foco por ate 20s para considerar
      // a sessao/app iniciados, mas na pratica o foco quase sempre ja
      // esta em MainActivity no primeiro poll, fazendo o start falhar
      // com "SplashActivity never started" mesmo o app tendo aberto
      // normalmente. Listando as duas activities aqui, o driver aceita
      // qualquer uma das duas como sinal de que o app iniciou.
      'appium:appWaitActivity':
        'com.saucelabs.mydemoapp.android.view.activities.SplashActivity,com.saucelabs.mydemoapp.android.view.activities.MainActivity',
    },
  ],

  logLevel: 'info',
  bail: 0,
  // 30s (em vez do padrao de 5s/10s) porque o primeiro boot do app num
  // emulador "frio" (ex.: no CI, onde o AVD acabou de ser criado) demora
  // mais para renderizar a tela inicial do que num emulador local ja
  // aquecido de execucoes anteriores.
  waitforTimeout: 30000,
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
    // 150s (em vez de 60s) porque esse timeout vale tanto para steps quanto
    // para hooks (o @wdio/cucumber-framework usa este valor global para
    // ambos, ignorando qualquer timeout individual passado a Before/After -
    // ver comentario em test/step-definitions/hooks.ts). O hook `Before`
    // reinicia a sessao do Appium a cada cenario via `resetApp()`, o que em
    // emuladores mais lentos pode levar bem mais que 60s e fazia o cenario
    // falhar por timeout antes mesmo de comecar.
    timeout: 150000,
    ignoreUndefinedDefinitions: false,
  },
};
