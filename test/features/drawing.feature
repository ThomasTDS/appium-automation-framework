# language: pt
Funcionalidade: Desenho no quadro
  Como um usuário do My Demo App
  Eu quero desenhar no quadro e salvar o resultado
  Para testar gestos de toque e a interação com a galeria do dispositivo

  Cenário: Desenhar no quadro e salvar exibe confirmação de sucesso
    Dado que o usuário está na tela de desenho
    Quando ele desenha uma linha no quadro
    E ele toca em salvar
    Então uma mensagem confirmando que o desenho foi salvo deve ser exibida
