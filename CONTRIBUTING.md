# Como contribuir

Obrigado pelo interesse neste projeto! Este é um repositório de
portfólio mantido por uma única pessoa, mas segue um fluxo de trabalho
real de equipe — abaixo está como qualquer mudança (sua ou automática,
como as do Dependabot) passa a fazer parte do projeto.

## Antes de começar

Pré-requisitos, configuração do ambiente e instalação estão documentados
no [README](README.md#pré-requisitos).

## Fluxo de trabalho

1. Crie uma branch a partir de `main`, usando o prefixo correspondente ao
   tipo de mudança:
   - `feat/` — novo cenário de teste ou funcionalidade
   - `fix/` — correção de bug
   - `docs/` — documentação
   - `ci/` — infraestrutura de integração contínua
   - `chore/` — manutenção ou tarefas que não se encaixam nas anteriores

2. Rode as checagens locais antes de abrir a Pull Request:

   ```bash
   npm run lint
   npm run format:check
   npm run typecheck
   npm test
   ```

   As três primeiras já rodam automaticamente num hook de pre-commit via
   Husky, mas vale rodar `npm test` manualmente contra o emulador antes
   de abrir a PR.

3. Abra a Pull Request contra `main`, preenchendo o [template de
   PR](.github/PULL_REQUEST_TEMPLATE.md).

4. O CI (GitHub Actions) precisa terminar verde — é um requisito de
   proteção de branch, sem exceção nem para o mantenedor do repositório.

## Convenção de commits

Mensagens de commit seguem o padrão `tipo: descrição`, com o tipo
batendo com o prefixo da branch (`feat:`, `fix:`, `docs:`, `ci:`,
`chore:`).

## Padrões de código

- TypeScript, com ESLint e Prettier (configuração em
  `eslint.config.mjs` e `.prettierrc.json`).
- Testes em BDD (Cucumber/Gherkin), seguindo o padrão Page Object Model
  — ver a organização das pastas em [`test/`](test/).
- Cenários escritos em português, com um par de caminho feliz + caminho
  negativo por funcionalidade antes de avançar para casos de borda.

## Sobre revisão e merge

Todas as Pull Requests — inclusive as abertas automaticamente pelo
Dependabot — são revisadas e mescladas manualmente pelo mantenedor deste
repositório. Não há merge automático configurado.

## Reportando bugs

Use o [template de bug report](.github/ISSUE_TEMPLATE/bug_report.md) ao
abrir uma Issue, cobrindo ambiente, severidade, prioridade, passos de
reprodução e causa raiz.
