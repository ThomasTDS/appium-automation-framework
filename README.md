# Appium Automation Framework

![CI](https://github.com/ThomasTDS/appium-automation-framework/actions/workflows/ci.yml/badge.svg)
![Licença](https://img.shields.io/badge/licen%C3%A7a-MIT-blue.svg)
![Node.js](https://img.shields.io/badge/node-%3E%3D18.20.0-brightgreen.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-6.x-3178c6.svg)

Framework de automação de testes end-to-end para aplicativos Android, construído com **Appium**, **WebdriverIO** e **TypeScript**, seguindo os padrões **BDD** (Behavior Driven Development, com Cucumber) e **Page Object Model**.

Este é um projeto de portfólio, desenvolvido para demonstrar, na prática, conhecimentos de automação de testes mobile: definição de cenários em linguagem de negócio, organização de código sustentável, execução em emulador Android e integração contínua.

## Sumário

- [Sobre o projeto](#sobre-o-projeto)
- [Tecnologias e ferramentas](#tecnologias-e-ferramentas)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Aplicativo sob teste](#aplicativo-sob-teste)
- [Pré-requisitos](#pré-requisitos)
- [Configuração do ambiente](#configuração-do-ambiente)
- [Instalação](#instalação)
- [Executando os testes](#executando-os-testes)
- [Relatório de testes (Allure)](#relatório-de-testes-allure)
- [Padrões de qualidade de código](#padrões-de-qualidade-de-código)
- [Integração contínua](#integração-contínua)
- [Cenários de teste implementados](#cenários-de-teste-implementados)
- [Licença](#licença)
- [Autor](#autor)

## Sobre o projeto

O objetivo deste repositório é simular, da forma mais próxima possível da realidade, um projeto de automação de testes mobile mantido por uma equipe de qualidade (QA). Para isso, os testes são escritos em formato **Gherkin** (dado/quando/então), organizados por Page Objects reutilizáveis, e executados automaticamente a cada alteração de código através de um pipeline de integração contínua no GitHub Actions.

O aplicativo utilizado como alvo dos testes é o [My Demo App](https://github.com/saucelabs/my-demo-app-android), um aplicativo Android de e-commerce fictício mantido pela Sauce Labs especificamente para fins de treinamento e demonstração de automação de testes.

## Tecnologias e ferramentas

| Categoria                    | Ferramenta                                                       |
| ---------------------------- | ---------------------------------------------------------------- |
| Linguagem                    | TypeScript                                                       |
| Framework de automação       | [WebdriverIO](https://webdriver.io/)                             |
| Driver de automação mobile   | [Appium](https://appium.io/) (driver UiAutomator2)               |
| Estilo de escrita dos testes | BDD com [Cucumber](https://cucumber.io/) (cenários em português) |
| Padrão de organização        | Page Object Model                                                |
| Relatório de execução        | [Allure Report](https://allurereport.org/)                       |
| Qualidade de código          | ESLint e Prettier                                                |
| Integração contínua          | GitHub Actions                                                   |
| Plataforma testada           | Android (emulador via Android Studio)                            |

## Estrutura do projeto

```
.
├── .github/workflows/       # Pipeline de integração contínua
├── apps/                    # Local onde o APK do app sob teste deve ser colocado
├── test/
│   ├── features/            # Cenários de teste em Gherkin (.feature)
│   ├── pageobjects/         # Page Objects (classe base + telas do app)
│   └── step-definitions/    # Ligação entre os passos Gherkin e os Page Objects
├── wdio.conf.ts             # Configuração do WebdriverIO/Appium
├── tsconfig.json            # Configuração do TypeScript
├── eslint.config.mjs        # Configuração do ESLint
└── .env.example             # Modelo de variáveis de ambiente
```

## Aplicativo sob teste

Os testes rodam contra o **My Demo App Android**, da Sauce Labs: um aplicativo de e-commerce fictício com login, catálogo de produtos, carrinho de compras e diversas outras funcionalidades de demonstração (QR Code, geolocalização, biometria, entre outras).

- Repositório oficial: [saucelabs/my-demo-app-android](https://github.com/saucelabs/my-demo-app-android)
- Pacote Android: `com.saucelabs.mydemoapp.android`
- Credencial de demonstração utilizada nos testes: usuário `bod@example.com`, senha `10203040`

O arquivo `.apk` **não é versionado** neste repositório (ver seção [Instalação](#instalação) para instruções de download).

## Pré-requisitos

Antes de rodar os testes localmente, é necessário ter instalado:

- [Node.js](https://nodejs.org/) 18.20 ou superior
- [JDK (Java Development Kit)](https://adoptium.net/) 17 ou superior
- [Android Studio](https://developer.android.com/studio), com:
  - Android SDK (Platform-Tools, Build-Tools, Platform e Emulator)
  - Um dispositivo virtual (AVD) já criado e funcional

As variáveis de ambiente a seguir também precisam estar configuradas no sistema operacional:

| Variável                               | Descrição                            |
| -------------------------------------- | ------------------------------------ |
| `JAVA_HOME`                            | Caminho de instalação do JDK         |
| `ANDROID_HOME` (ou `ANDROID_SDK_ROOT`) | Caminho de instalação do Android SDK |

O `PATH` do sistema deve incluir as pastas `platform-tools` e `emulator` do Android SDK, para que os comandos `adb` e `emulator` funcionem diretamente no terminal.

## Configuração do ambiente

1. Copie o arquivo de variáveis de ambiente de exemplo:

   ```bash
   cp .env.example .env
   ```

2. Ajuste, se necessário, os valores em `.env`:

   | Variável              | Padrão                        | Descrição                                        |
   | --------------------- | ----------------------------- | ------------------------------------------------ |
   | `ANDROID_APP_PATH`    | `./apps/android-demo-app.apk` | Caminho do APK do aplicativo sob teste           |
   | `ANDROID_DEVICE_NAME` | `medium_phone`                | Nome do dispositivo usado pelo Appium            |
   | `ANDROID_AVD_NAME`    | `medium_phone`                | Nome do dispositivo virtual (AVD) a ser iniciado |

   O nome do AVD deve corresponder a um dispositivo virtual já criado no seu Android Studio (**Device Manager**). Caso utilize um nome diferente de `medium_phone`, atualize essas variáveis de acordo.

## Instalação

1. Clone o repositório:

   ```bash
   git clone git@github.com:ThomasTDS/appium-automation-framework.git
   cd appium-automation-framework
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Baixe o APK do aplicativo sob teste e coloque-o na pasta `apps/`:

   ```bash
   curl -L -o ./apps/android-demo-app.apk \
     https://github.com/saucelabs/my-demo-app-android/releases/download/2.2.0/mda-2.2.0-25.apk
   ```

   > O comando acima aponta para a versão `2.2.0` (a mais recente no momento em que este projeto foi escrito). Caso uma versão mais nova já tenha sido publicada, verifique o nome exato do arquivo `.apk` em [releases do my-demo-app-android](https://github.com/saucelabs/my-demo-app-android/releases) e ajuste a URL do comando de acordo.

4. Inicie o emulador Android configurado no Android Studio (ou deixe o Appium iniciá-lo automaticamente na primeira execução dos testes, através da variável `ANDROID_AVD_NAME`).

## Executando os testes

Com o ambiente configurado, basta rodar:

```bash
npm test
```

Esse comando inicia o servidor do Appium automaticamente (via `@wdio/appium-service`), conecta ao emulador Android e executa todos os cenários definidos em `test/features/`.

## Relatório de testes (Allure)

A cada execução, os resultados são registrados na pasta `allure-results/`. Para visualizá-los como um relatório HTML navegável:

```bash
# Gera o relatório HTML a partir dos resultados da última execução
npm run report:generate

# Abre o relatório gerado no navegador
npm run report:open
```

O relatório inclui os passos de cada cenário, tempo de execução e capturas de tela em caso de falha.

## Padrões de qualidade de código

```bash
# Verifica problemas de lint
npm run lint

# Corrige automaticamente o que for possível
npm run lint:fix

# Verifica a formatação do código
npm run format:check

# Formata o código automaticamente
npm run format

# Verifica erros de tipo do TypeScript
npm run typecheck
```

Essas três verificações (lint, formatação e tipos) rodam automaticamente em um job dedicado do CI a cada `push` ou _pull request_, de forma independente e em paralelo à execução dos testes end-to-end.

## Integração contínua

A cada `push` ou _pull request_ para a branch `main`, o workflow definido em [`.github/workflows/ci.yml`](.github/workflows/ci.yml) executa automaticamente toda a suíte de testes em um emulador Android hospedado no GitHub Actions, e publica o relatório Allure como artefato do workflow, disponível para download na aba **Actions** do repositório.

## Cenários de teste implementados

| Funcionalidade | Cenário                       | Arquivo                                                      |
| -------------- | ----------------------------- | ------------------------------------------------------------ |
| Login          | Login com credenciais válidas | [`test/features/login.feature`](test/features/login.feature) |

Esta lista é atualizada conforme novos cenários são adicionados ao projeto.

## Licença

Este projeto está licenciado sob os termos da licença MIT. Consulte o arquivo [LICENSE](LICENSE) para mais detalhes.

## Autor

Desenvolvido por [Thomas Teixeira](https://github.com/ThomasTDS) como projeto de estudo e portfólio em automação de testes mobile.
