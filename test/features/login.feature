# language: pt
Funcionalidade: Login no aplicativo
  Como um usuário do My Demo App
  Eu quero fazer login com credenciais válidas
  Para acessar a área autenticada do aplicativo

  Cenário: Login com credenciais válidas
    Dado que o usuário está na tela de login
    Quando ele preenche o usuário "bod@example.com" e a senha "10203040"
    E toca no botão de login
    Então o menu do aplicativo deve exibir a opção "Log Out"

  Cenário: Login com usuário bloqueado
    Dado que o usuário está na tela de login
    Quando ele preenche o usuário "alice@example.com" e a senha "10203040"
    E toca no botão de login
    Então uma mensagem de erro "Sorry this user has been locked out." deve ser exibida
