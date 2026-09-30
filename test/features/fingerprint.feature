# language: pt
Funcionalidade: Login por biometria
  Como um usuário do My Demo App
  Eu quero habilitar o login por biometria
  Para acessar o app mais rapidamente nas próximas vezes

  Cenário: Tela de biometria indica indisponibilidade no dispositivo
    Dado que o usuário está navegando pelo catálogo de produtos
    Quando ele abre a tela de FingerPrint pelo menu
    Então uma mensagem informando que a biometria não está disponível deve ser exibida
    Quando ele fecha o aviso
    Então a opção de login por biometria deve permanecer desabilitada
