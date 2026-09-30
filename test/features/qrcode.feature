# language: pt
Funcionalidade: Leitor de QR Code
  Como um usuário do My Demo App
  Eu quero abrir o leitor de QR Code
  Para escanear códigos usando a câmera do dispositivo

  Cenário: Abrir o leitor de QR Code exibe a pré-visualização da câmera
    Dado que o usuário está navegando pelo catálogo de produtos
    Quando ele abre o leitor de QR Code pelo menu
    Então a pré-visualização da câmera deve ser exibida
    Quando ele volta para a tela anterior
    Então o catálogo de produtos deve ser exibido novamente
