
# Desafio Técnico 2: API RESTful

Esse projeto foi feito para um desafio técnico que tem como objetivo construir uma API RESTful que permita operações de cadastro, autenticação e recuperação de informações do usuário.

O desafio possui os seguintes requisitos:
- Persistência de dados.
- Sistema de build com gerenciamento de dependências.
- Task runner para build.
- Padronização de estilo (ex: jsHint/jsLint).
- Framework: Express, Hapi, ou similar.

E os seguintes requisitos desejáveis:
- JWT como token.
- Testes unitários.
- Criptografia hash na senha e token.


De todos os requisitos listados acima, o único a não ser cumprido foi a criação de testes unitários. Sobre outros requisitos, é valido destacar:
- O NPM foi utilizado para a build e NPM Scripts para o task running.
- A persistência de dados foi feita utilizando do banco de dados não relacional [MongoDB](https://www.mongodb.com/).
- A padronização de estilo foi feita utilizando ESLint.
- O framework escolhido foi o Express.
- O sistema utiliza de JWTs e aplica criptografia hash nas senhas e tokens.


## 💻 Pré-requisitos

Antes de rodar o projeto, verifique se você atendeu aos seguintes requisitos:
- Tem o Docker instalado em sua máquina.
- Tem a versão LTS mais recente do Node.js instalada na sua máquina (20.10.0)
- Tem o git instalado em sua máquina.

## 🚀 Como Instalar
Para instalar o projeto e rodar ele em sua máquina, siga estas etapas:
- Clone o repositório para sua máquina:
```bash
$ git clone https://github.com/Catskhi/Backend_challenge_2.git
```
- Vá para a pasta que você clonou o projeto, se estiver no terminal, pode utilizar:
```bash
$ cd Backend_challenge_2
```
- Agora, instale as dependências do Node.Js:
```bash
$ npm install
```
- Defina as variáveis de ambiente, crie um arquivo chamado .env na pasta raiz da aplicação e preencha conforme o exemplo no [.env.example](https://github.com/Catskhi/Backend_challenge_2/blob/main/.env.example) do projeto.
- Agora, você pode subir o banco de dados MongoDB com Docker Compose:
```bash
$ docker compose up -d
```
- Finalmente, pode rodar o projeto:
```bash
$ npm run build
$ npm run start
```
## Endpoints
O sistema conta com três endpoints, sendo eles:

#### Sign Up (Criação de Cadastro)

Cria um novo usuário se o e-mail passado não existir no banco de dados. Após criar seu usuário, te retorna suas informações, assim como um token JWT.

```http
  POST /signup/
```

| Parâmetros| Tipo     | Descrição                |
| :-------- | :------- | :------------------------- |
| `nome` | `string` | **Obrigatório**. Seu nome de usuário |
| `email` | `string` | **Obrigatório**. Seu endereço de e-mail |
| `senha` | `senha` | **Obrigatório**. Sua senha |
| `telefones` | `array {numero, ddd}` | **Obrigatório**. Um array com os seus telefones |

Exemplo de telefone: 
`[{"numero": "123456789", "ddd": "31"}]`

#### Sign In (Autenticação)

Valida se o seu email e senha estão corretos e te retorna suas informações de usuário, além de um token JWT.

```http
  POST /signin/
```

| Parâmetros| Tipo     | Descrição                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Obrigatório**. Seu endereço de e-mail |
| `senha` | `senha` | **Obrigatório**. Sua senha |

#### Find (Buscar usuário)

Busca as informações do seu usuário, requer Header Authentication com o valor Bearer {token}.

```http
  GET /find/
```

