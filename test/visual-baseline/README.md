# Baseline visual

Imagens de referência usadas pelo `@wdio/visual-service` (ver
`wdio.conf.ts`) para detectar regressão visual. Cada execução captura a
tela atual e compara contra o arquivo aqui correspondente à mesma tag.

## Por que a baseline não é gerada localmente

A renderização de uma tela (antialiasing, fontes, DPI) varia entre
ambientes diferentes — um emulador rodando no Windows local não produz a
mesma imagem, pixel a pixel, que o emulador do GitHub Actions (Ubuntu). Se
a baseline for gerada numa máquina e comparada na outra, o teste falha por
diferença de ambiente, não por uma regressão real.

Por isso a baseline oficial deste projeto é sempre gerada **dentro do
próprio CI**, nunca copiada de uma execução local.

## Como gerar ou atualizar a baseline oficial

1. Rode o workflow de CI normalmente (push ou Pull Request). A opção
   `autoSaveBaseline: true` (configurada em `wdio.conf.ts`) faz a imagem
   ser criada automaticamente na primeira vez que uma tag não tiver uma
   baseline correspondente — nesse caso o teste passa trivialmente (0%
   de diferença contra a imagem recém-criada).
2. Baixe o artefato `visual-baseline` gerado por essa execução, na aba
   **Actions** do GitHub Actions.
3. Copie os arquivos `.png` baixados para esta pasta e comite.
4. A partir da próxima execução, o teste passa a comparar de verdade
   contra essa imagem.

Para atualizar uma baseline de propósito (depois de uma mudança visual
real e intencional), repita os mesmos passos: apague o arquivo antigo (ou
deixe o CI sobrescrevê-lo gerando um novo) e substitua pelo gerado na
execução mais recente.
