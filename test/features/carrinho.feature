# language: pt
Funcionalidade: Carrinho de compras
  Como um usuário do My Demo App
  Eu quero adicionar produtos ao carrinho
  Para poder finalizar uma compra

  Cenário: Adicionar produto ao carrinho
    Dado que o usuário está navegando pelo catálogo de produtos
    Quando ele adiciona o primeiro produto da lista ao carrinho
    Então o carrinho deve exibir 1 item
    E o item no carrinho deve ser "Sauce Labs Backpack"

  Cenário: Finalizar compra sem estar logado
    Dado que o usuário está navegando pelo catálogo de produtos
    Quando ele adiciona o primeiro produto da lista ao carrinho
    E ele tenta finalizar a compra sem estar logado
    Então o aplicativo deve solicitar o login

  Cenário: Remover produto do carrinho
    Dado que o usuário está navegando pelo catálogo de produtos
    Quando ele adiciona o primeiro produto da lista ao carrinho
    E ele remove o item do carrinho
    Então o carrinho deve exibir a mensagem "No Items"
