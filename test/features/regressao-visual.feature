# language: pt
Funcionalidade: Regressão visual
  Como um usuário do My Demo App
  Eu quero que a interface do aplicativo não sofra alterações visuais não intencionais
  Para ter confiança de que uma mudança de código não quebrou o layout de uma tela

  Cenário: Tela de catálogo de produtos não sofreu alteração visual
    Dado que o usuário está navegando pelo catálogo de produtos
    Então a tela deve corresponder à baseline visual "catalogo-produtos"
