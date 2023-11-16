# Arquitetura do Projeto de Software

## Front-end (React Native):

- O front-end é desenvolvido usando o framework React Native, permitindo aplicativos móveis multiplataforma.
- Comunica-se com o back-end por meio de chamadas de API RESTful para buscar dados e atualizações.

## Back-end (NestJS):

- O back-end é construído usando o framework NestJS, baseado em Node.js, fornecendo arquitetura escalável para aplicativos server-side.
- Expõe endpoints de API RESTful consumidos pelo front-end.
- Usa JWT (JSON Web Tokens) para autenticação e autorização de solicitações.
- Está sendo mantido online pelo Fly.io

## Banco de Dados (MongoDB):

- O MongoDB é o sistema de gerenciamento de banco de dados usado para armazenar dados do aplicativo.
- É um banco de dados NoSQL escalável adequado para grandes volumes de dados não estruturados.
- Está online no MongoDB Atlas

## Testes:

- Testes são realizados com as seguintes ferramentas:
  - Jest: Usado para testes unitários e de integração no back-end.
  - Cypress: Usado para testes de interface de usuário (UI) e testes de ponta a ponta no front-end.

A comunicação entre as camadas do aplicativo ocorre da seguinte maneira:

- O React Native no front-end faz chamadas de API RESTful para o back-end NestJS.
- O back-end processa essas solicitações, acessa o banco de dados MongoDB conforme necessário e responde com dados ou atualizações.
- A autenticação é tratada usando JWT, garantindo que apenas usuários autorizados tenham acesso aos recursos protegidos.
- O Swagger fornece documentação útil da API para desenvolvedores e facilita a integração.
