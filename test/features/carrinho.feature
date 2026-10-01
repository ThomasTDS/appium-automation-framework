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

  Cenário: Ajustar a quantidade antes de adicionar ao carrinho
    Dado que o usuário está navegando pelo catálogo de produtos
    Quando ele abre o primeiro produto da lista
    E ele aumenta a quantidade em 2
    E ele adiciona o produto ao carrinho
    E ele abre o carrinho
    Então o carrinho deve exibir 3 itens
    E a quantidade do item no carrinho deve ser 3

  Cenário: Adicionar o mesmo produto duas vezes soma a quantidade no carrinho
    Dado que o usuário está navegando pelo catálogo de produtos
    Quando ele abre o primeiro produto da lista
    E ele adiciona o produto ao carrinho
    E ele volta para o catálogo e adiciona o mesmo produto novamente
    E ele abre o carrinho
    Então o carrinho deve exibir 2 itens
    E a quantidade do item no carrinho deve ser 2
