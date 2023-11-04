# Sobre o Projeto

Este projeto consiste em um dashboard com funcionalidades de login, edição de informações do usuário logado e listagem de usuários (empresas). Além disso, oferece operações CRUD (Criar, Ler, Atualizar e Deletar) para os usuários.

---

## Requisitos para Executar o Projeto

Para executar o projeto, você precisará das seguintes ferramentas instaladas:

- Node.js (Versão recomendada: v18.15.0)
- Docker Desktop (Versão recomendada: v24.0.5)

---

## Como Iniciar o Projeto Passo a Passo

### 1. Clone os Repositórios

Primeiro, faça o clone dos seguintes repositórios:

- [Repositório do Back-end](https://github.com/MarcosReisDS/desafio-energizou-back-end)
- [Repositório do Front-end](https://github.com/MarcosReisDS/desafio-energizou-front-end)

Adicione ambos os projetos na mesma raiz de sua escolha, como mostrado abaixo:

markdown
qualquer-pasta
| desafio-energizou-back-end
| desafio-energizou-front-end


Essa estrutura é necessária para garantir que o próximo passo funcione corretamente.

### 2. Inicie o Docker

Dentro da pasta desafio-energizou-front-end, execute o seguinte comando para iniciar o Docker:

bash
docker-compose up


Isso iniciará o processo de download e criação das imagens dos seguintes componentes:

- energizou-desafio-db
- energizou-desafio-front
- energizou-desafio-api

*Observações Importantes*:

- Se você estiver usando o Windows, fique atento às solicitações de permissão do Docker para compartilhamento de pastas.
- Aguarde até que o banco de dados seja totalmente criado, mesmo que pareça que o processo tenha sido concluído.

### 3. Acesse o Sistema

Após a conclusão do processo de criação do Docker, você poderá usar o sistema. Acesse-o via URL http://localhost:3000/ e utilize as seguintes credenciais:

- *Nome de usuário*: admin
- *Senha*: admin

Agora você está pronto para explorar e utilizar o sistema de dashboard.

---

## Contato

Qualquer dúvida entre em contato:
- *Email* - [marcos.reis349@gmail.com](mailto:marcos.reis349@gmail.com)
- *Linkedin* - https://www.linkedin.com/in/marcos-reis-3bb982205/
- *WhatsApp* - [(13) 98855-3245](https://wa.me/5513988553245)
