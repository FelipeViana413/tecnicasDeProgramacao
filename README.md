Conversor Decimal → Binário/Hexadecimal com CI/CD

Projeto desenvolvido para a disciplina de Técnicas de Programação, com o objetivo de praticar desenvolvimento de APIs, testes automatizados (TDD) e pipelines de CI/CD.

🛠️ Tecnologias utilizadas
Node.js — ambiente de execução JavaScript no servidor
Express.js — framework para criação da API REST
Jest — framework de testes automatizados
Supertest — biblioteca para testar endpoints HTTP
jest-junit — geração de relatórios de teste no formato JUnit XML
Docker & Docker Compose — containerização do ambiente de CI/CD
Jenkins — servidor de automação para pipeline de CI/CD
Git & GitHub — versionamento de código
📌 Sobre o projeto

A aplicação é uma API REST simples que expõe dois endpoints:

GET /to-binary/:decimal — converte um número decimal para binário
GET /to-hex/:decimal — converte um número decimal para hexadecimal

Ambos retornam erro 400 com mensagem descritiva caso o parâmetro informado não seja um número válido.

🧪 Testes e TDD

O projeto foi desenvolvido seguindo o ciclo de Test-Driven Development (TDD):

🔴 RED — escrita do teste que falha, definindo o comportamento esperado antes de implementá-lo
🟢 GREEN — implementação do código mínimo necessário para o teste passar
🔵 REFACTOR — melhoria da qualidade do código mantendo os testes passando

A cobertura de testes final ficou em 100% (statements, branches, functions e lines).

🚀 CI/CD com Jenkins

Foi criada uma pipeline de Integração Contínua (CI) utilizando Jenkins rodando em um container Docker, com as seguintes etapas automatizadas a cada push no repositório:

Checkout (Git) — clona o repositório do GitHub
Instalando Dependências — executa npm install
Rodar Testes — executa a suíte de testes com Jest
Cobertura de Testes — gera relatório de cobertura de código
Relatório JUnit — gera relatório de testes em formato XML, integrado à interface do Jenkins
Publicar Relatório de Cobertura — publica relatório HTML de cobertura acessível diretamente pelo Jenkins

O ambiente do Jenkins foi provisionado via Docker Compose, utilizando uma imagem customizada (Dockerfile) baseada em jenkins/jenkins:lts, com Node.js e npm instalados para permitir a execução do projeto dentro do próprio container.

📖 Principais aprendizados
Diferença entre app.js (definição da aplicação Express, testável) e server.js (responsável por efetivamente subir o servidor) — separação essencial para permitir testes automatizados sem depender de uma porta real aberta
Uso de middlewares no Express para separar lógica de validação da lógica de negócio
Configuração de autenticação segura entre Jenkins e repositórios privados do GitHub via Personal Access Token
Resolução de problemas comuns de ambiente (permissões de execução em containers Linux, virtualização de hardware, WSL2 no Windows)
Diferença entre containers Docker (ambientes isolados e efêmeros) e a máquina host
