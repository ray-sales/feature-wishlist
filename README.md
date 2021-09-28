
# :computer: Feature - Wishlist

web app que visa funcionalidades contidas em uma lista de desejos. Segue abaixo lista das funcionalidades implantadas:

* inserção dos produtos na lista;
* remoção dos produtos contidos na lista;
* pesquisa entre os produtos existentes na home;
* cópia automática do telefone de atendimento;
* busca da cidade o usuário caso possua permissão

## :arrow_forward: Instalação, Teste e Execução do projeto

 Para iniciar o projeto, é necessário possuir os seguintes pré-requisitos instalados:

* NodeJS

Após realizar o clone do repositório, execute o seguinte comando em seu cmd na pasta do projeto para instalar as dependências:
    
    npm install


Em seguida, após o término da instalação acima, inicie o projeto com o comando abaixo:

    npm start

O projeto está configurado para executar localmente em: http://localhost:3000

Para executar o teste, execute o comando abaixo:

    npm test






## :books: API Reference

#### Página com todos os produtos

Os produtos são renderizados juntamente com o carregamento da página principal.

```http
  GET /
```

#### Página com produtos da wishlist

```http
  GET /wishlist
```

#### Adicionar item na wishlist

```http
  POST /api/add-wishlist
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `number` | **Obrigatório** fornecido através do body da requisição |

#### Remover item da wishlist

```http
  DELETE /api/remove-wishlist/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `number` | **Obrigatório** fornecido como parâmetro |

#### Retornar Ids da wishlist

```http
  GET /api/wishlist
```

#### Retornar cidade a partir da latitude e longitude

```http
  GET /api/get-city
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `lat`      | `number` | **Obrigatório** latitude |
| `long`      | `number` | **Obrigatório** longitude |

   ## :hammer_and_wrench: Tecnologias utilizadas

* NodeJS
* ExpressJS
* Jade Template Engine
* SASS - SCSS
* Axios
* Gerenciamento de Cookies
* Jest
* Supertest
