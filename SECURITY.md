# Política de Segurança

## Escopo

Este é um projeto de portfólio: um framework de automação de testes mobile, não um serviço em produção que processa dados reais de usuários. Ainda assim, vulnerabilidades no próprio código do framework (por exemplo, algo que pudesse expor credenciais, executar código arbitrário a partir de dados de teste, ou comprometer a cadeia de suprimentos do repositório) são levadas a sério.

**Fora de escopo** deste repositório:

- Vulnerabilidades na aplicação sob teste ([My Demo App](https://github.com/saucelabs/my-demo-app-android), mantida pela Sauce Labs) — reporte diretamente ao repositório oficial dela.
- Vulnerabilidades em dependências de terceiros (`node_modules`) — essas já são monitoradas automaticamente via [Dependabot](https://github.com/ThomasTDS/appium-automation-framework/security/dependabot) e uma checagem de `npm audit` no CI; reporte ao mantenedor do pacote afetado, se ainda não corrigido na origem.

## Versões suportadas

Este projeto não segue versionamento semântico nem publica releases — apenas a branch `main` é mantida e suportada. Qualquer correção de segurança é aplicada diretamente nela.

## Como reportar uma vulnerabilidade

Use o recurso de [relatório privado de vulnerabilidade](https://github.com/ThomasTDS/appium-automation-framework/security/advisories/new) do GitHub (aba **Security** → **Report a vulnerability**), em vez de abrir uma Issue pública. Isso garante que o relato não fique visível publicamente antes de uma correção estar disponível.

Inclua, se possível:

- Descrição do problema e impacto potencial.
- Passos para reproduzir.
- Versão/commit afetado.

## O que esperar

Este repositório é mantido por uma única pessoa, no tempo livre — não há um SLA formal de resposta. O relato será reconhecido assim que possível, com um retorno sobre se é procedente e, em caso positivo, uma correção ou mitigação.
