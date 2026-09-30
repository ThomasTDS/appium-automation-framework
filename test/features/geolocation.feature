# language: pt
Funcionalidade: Geolocalização
  Como um usuário do My Demo App
  Eu quero ver a localização observada pelo dispositivo
  Para confirmar que o app reflete a posição geográfica atual

  Cenário: Definir a localização do dispositivo reflete na tela
    Dado que a localização do dispositivo foi definida para latitude "-23.5505" e longitude "-46.6333"
    Quando ele abre a tela de Geo Location pelo menu
    Então a latitude exibida deve ser aproximadamente "-23.5505"
    E a longitude exibida deve ser aproximadamente "-46.6333"
