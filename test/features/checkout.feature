# language: pt
Funcionalidade: Finalização de compra
  Como um usuário autenticado do My Demo App
  Eu quero concluir a compra de um produto no carrinho
  Para receber a confirmação do pedido

  Cenário: Finalizar compra com sucesso
    Dado que o usuário está logado e adicionou um produto ao carrinho
    Quando ele avança para o checkout
    E ele preenche o endereço de entrega com nome "Thomas Teixeira", endereço "Rua Exemplo, 123", cidade "São Paulo", CEP "01310-100" e país "Brazil"
    E ele avança para a tela de pagamento
    E ele preenche os dados do cartão com nome "Thomas Teixeira", número "4111 1111 1111 1111", validade "12/28" e código de segurança "123"
    E ele avança para a revisão do pedido
    E ele confirma o pedido
    Então a compra deve ser concluída com sucesso
