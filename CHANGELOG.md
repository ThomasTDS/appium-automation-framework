# Changelog

Histórico de mudanças notáveis deste projeto, em ordem cronológica. Como
o projeto não segue um esquema de versionamento por tags, as entradas são
agrupadas por data de mesclagem na branch `main`.

## 2026-10-12

### Adicionado

- Gráfico de tendência (Trend) no relatório Allure, comparando resultados
  entre execuções.
- [Dependabot](https://github.com/dependabot) (atualização automática de
  dependências `npm` e GitHub Actions) e checagem de vulnerabilidades
  (`npm audit`) informativa no CI.
- Seção "Bugs encontrados" no README, com o defeito real documentado na
  [Issue #22](https://github.com/ThomasTDS/appium-automation-framework/issues/22).
- Metadados padrão do npm no `package.json` (`repository`, `bugs`,
  `homepage`, `author`, `keywords`).

## 2026-10-01

### Adicionado

- GIF de demonstração real da suíte rodando no README, gravado via
  `adb shell screenrecord` contra o emulador Android.

## 2026-09-30

### Adicionado

- Cenários de edge case de carrinho: ajustar a quantidade antes de
  adicionar, e adicionar o mesmo produto duas vezes.
- Cenário de biometria (tela de indisponibilidade de FingerPrint).
- Cenário de geolocalização (mock de localização via Appium).
- Cenário de gesto de desenho (Drawing), usando a W3C Actions API.
- Cenário de leitor de QR Code.

### Alterado

- Cenário de login com campos vazios reescrito como Scenario Outline
  (Cucumber), cobrindo três combinações de campo obrigatório.

### Encontrado

- Bug real de autenticação na aplicação sob teste: login aceito com
  qualquer senha, e com e-mails nunca cadastrados, exceto usuários
  explicitamente marcados como bloqueados
  ([Issue #22](https://github.com/ThomasTDS/appium-automation-framework/issues/22)).

## 2026-09-22

### Adicionado

- Fluxo completo de compra (checkout): login, carrinho, endereço de
  entrega, pagamento e confirmação do pedido.

## 2026-09-15 a 2026-09-16

### Adicionado

- Relatório Allure publicado automaticamente no GitHub Pages a cada push
  na `main`.
- Retry automático de arquivo de spec instável no CI
  (`specFileRetries`).
- Gatilho manual (`workflow_dispatch`) no workflow de CI.
- Hook de pre-commit com Husky e lint-staged.
- Template de Pull Request.

## 2026-09-06 a 2026-09-08

### Adicionado

- Estrutura base do framework (Appium + WebdriverIO + TypeScript, ESLint,
  Prettier).
- Primeiro cenário de teste: login com credenciais válidas.
- Cenário de login com usuário bloqueado.
- Fluxo de carrinho de compras (adicionar produto, checkout sem login,
  remover produto).
- Edge cases de login (campos vazios) e carrinho.
- Integração contínua com GitHub Actions (testes end-to-end e gate de
  qualidade de código).
- Template de bug report via Issues do GitHub.
- README profissional completo.

### Corrigido

- Flakiness na (re)inicialização da sessão do Appium entre cenários.
- Padronização de fim de linha (CRLF/LF) via `.gitattributes`.
