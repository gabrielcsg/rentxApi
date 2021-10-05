# Requisitos

## Cadastro de carros

**RF - Requisitos Funcionais**\
Deve ser possível cadastrar um carro.\

**RN - Regras de negócio**\
Não deve ser possível cadastrar um carro com uma placa já existente.\
O carro deve ser cadastrado, por padrão com disponibilidade.\
O usuário responsável pelo cadastro deve ser um usuário admin.

## Listagem de carros

**RF - Requisitos Funcionais**\
Deve ser possível todos os carros disponiveis.\
Deve ser possível todos os carros disponiveis pelo nome da categoria.\
Deve ser possível todos os carros disponiveis pelo nome da marca.\
Deve ser possível todos os carros disponiveis pelo nome do carro.

**RN - Regras de negócio**\
O usuário não precisa estar logado no sistema.

## Cadastro de especificação do carro

**RF - Requisitos Funcionais**\
Deve ser possível cadastrar uma especificação para um carro.

**RN - Regras de negócio**\
Não deve ser possível cadastrar uma especificação para um carro não cadastrado.\
Não ser possível cadastrar uma especificação já cadastrada para um mesmo carro.\
O usuário responsável pelo cadastro deve ser um usuário admin.


## Cadastro de imagens do carro

**RF - Requisitos Funcionais**\
Deve ser possível cadastrar a imagem do carro.\
Deve ser possível listar todos os carros.

**RNF - Requisitos não funcionais**\
Utilizar o multer para upload dos arquivos.

**RN - Regras de negócio**\
O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.\
O usuário responsável pelo cadastro deve ser um usuário admin.

## Aluguel de carro

**RF - Requisitos Funcionais**\
Deve ser possível cadastrar um aluguel.

**RNF - Requisitos não funcionais**\
Utilizar o multer para upload dos arquivos.

**RN - Regras de negócio**\
O aluguel deve ter duração mínima de 24h\
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o usuário.\
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o carro.
