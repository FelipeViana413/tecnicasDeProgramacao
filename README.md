# Conversor Decimal → Binário/Hexadecimal com CI/CD

Projeto desenvolvido para a disciplina de Técnicas de Programação, com o objetivo de praticar desenvolvimento de APIs, testes automatizados (TDD) e pipelines de CI/CD.

## 🛠️ Tecnologias utilizadas

- **Node.js** — ambiente de execução JavaScript no servidor
- **Express.js** — framework para criação da API REST
- **Jest** — framework de testes automatizados
- **Supertest** — biblioteca para testar endpoints HTTP
- **jest-junit** — geração de relatórios de teste no formato JUnit XML
- **Docker & Docker Compose** — containerização do ambiente de CI/CD
- **Jenkins** — servidor de automação para pipeline de CI/CD
- **Git & GitHub** — versionamento de código

## 📌 Sobre o projeto

A aplicação é uma API REST simples que expõe dois endpoints:

- `GET /to-binary/:decimal` — converte um número decimal para binário
- `GET /to-hex/:decimal` — converte um número decimal para hexadecimal

Ambos retornam erro `400` com mensagem descritiva caso o parâmetro informado não seja um número válido.

## 🧪 Testes e TDD

O projeto foi desenvolvido seguindo o ciclo de **Test-Driven Development (TDD)**:

1. 🔴 **RED** — escrita do teste que falha, definindo o comportamento esperado antes de implementá-lo
2. 🟢 **GREEN** — implementação do código mínimo necessário para o teste passar
3. 🔵 **REFACTOR** — melhoria da qualidade do código mantendo os testes passando

A cobertura de testes final ficou em **100%** (statements, branches, functions e lines).

## 🚀 CI/CD com Jenkins

Foi criada uma pipeline de **Integração Contínua (CI)** utilizando Jenkins rodando em um container Docker, com as seguintes etapas automatizadas a cada `push` no repositório:

1. **Checkout (Git)** — clona o repositório do GitHub
2. **Instalando Dependências** — executa `npm install`
3. **Rodar Testes** — executa a suíte de testes com Jest
4. **Cobertura de Testes** — gera relatório de cobertura de código
5. **Relatório JUnit** — gera relatório de testes em formato XML, integrado à interface do Jenkins
6. **Publicar Relatório de Cobertura** — publica relatório HTML de cobertura acessível diretamente pelo Jenkins

O ambiente do Jenkins foi provisionado via **Docker Compose**, utilizando uma imagem customizada (`Dockerfile`) baseada em `jenkins/jenkins:lts`, com Node.js e npm instalados para permitir a execução do projeto dentro do próprio container.

## 🗄️ Integração com banco de dados relacional (MySQL)

Como extensão do projeto, foi criada uma nova aplicação (`conversor-mysql`) que integra o endpoint de conversão decimal → binário a um banco de dados **MySQL**, persistindo cada conversão realizada.

- **MySQL** — banco de dados relacional, rodando em container Docker
- **phpMyAdmin** — interface gráfica web para administração do banco
- **mysql2** — driver Node.js para conexão com MySQL

O ambiente foi provisionado via Docker Compose, subindo dois containers: um para o banco de dados (porta `3306`) e outro para o phpMyAdmin (porta `8080`), permitindo criar tabelas e consultar os dados sem precisar instalar nenhum SGBD localmente.

A cada requisição ao endpoint `/to-binary/:decimal`, além de retornar o resultado da conversão, a aplicação insere um novo registro na tabela `conversoes`, contendo o número decimal informado e sua conversão em binário.

## 🍃 Integração com banco de dados não-relacional (MongoDB)

Também foi desenvolvida uma versão da aplicação (`conversor_noSQL`) integrada a um banco **NoSQL**, para contrastar os dois paradigmas de persistência de dados.

- **MongoDB** — banco de dados orientado a documentos, rodando em container Docker
- **Mongo Express** — interface gráfica web para administração do MongoDB
- **mongodb** (driver oficial) — driver Node.js para conexão com o MongoDB

Assim como no exemplo com MySQL, o ambiente foi provisionado via Docker Compose (banco na porta `27017` e interface gráfica na porta `8081`). A cada requisição ao endpoint de conversão, um novo documento é inserido na coleção `conversoes`, dentro do banco `conversoes_db`, contendo o número decimal e sua representação em binário.

## 📖 Principais aprendizados

- Diferença entre `app.js` (definição da aplicação Express, testável) e `server.js` (responsável por efetivamente subir o servidor) — separação essencial para permitir testes automatizados sem depender de uma porta real aberta
- Uso de middlewares no Express para separar lógica de validação da lógica de negócio
- Configuração de autenticação segura entre Jenkins e repositórios privados do GitHub via Personal Access Token
- Resolução de problemas comuns de ambiente (permissões de execução em containers Linux, virtualização de hardware, WSL2 no Windows)
- Diferença entre containers Docker (ambientes isolados e efêmeros) e a máquina host
- Diferença prática entre bancos de dados relacionais (MySQL, com tabelas e schema fixo) e não-relacionais (MongoDB, com coleções e documentos flexíveis)
- Cuidado com conflito de portas ao rodar múltiplos projetos Node.js simultaneamente na mesma porta local

## ⚠️ Nota sobre segurança

As credenciais utilizadas nos arquivos `docker-compose.yml` deste repositório (usuários e senhas de banco de dados) são valores de exemplo, usados exclusivamente em ambiente local de estudo. Em um ambiente de produção real, essas credenciais devem ser gerenciadas via variáveis de ambiente e nunca versionadas em repositórios públicos.