# Implantação do Software

### Processo

O Processo de Implantação foi realizado tendo como prioridade a necessidade do cliente, que era uma aplicação Web que serve como ECommerce e realiza simulações e recomendações para o usuário. Tendo definido este objetivo, o segundo passo foram escolher as linguagens que a maior parte do grupo tinha familiaridade e que também são relevantes no cenário atual, e juntamente com isso definimos a arquitetura. A interface foi decididade após alguns protótipos sendo levados para o cliente e este escolhendo o que melhor lhe atendia, e após isso houveram refinamentos ao longo da implementação. O último ponto a ser implantado foi o servidor, onde decidimos usar o servidor que a empresa parceira do cliente, GPJ, já utiliza.

### Tecnologias

As tecnologias utilizadas na aplicação foram as seguintes:

- C# .NET 7
- Entity Framework Core
- SQL Server

- HTML
- CSS
- Typescript
- React

### Arquitetura

A aplicação foi divida em dois projetos, o Backend sendo uma API REST C# .NET 7, e o Frontend em React Typescript. O Frontend se comunica com o Backend através de requisições HTTP para todas as suas funcionalidades, sempre de forma assíncrona, enquanto o Backend realiza as regras de negócio, cálculos e se comunica com o banco de dados SQL Server através do ORM Entity Framework Core.

### Interface

A interface foi definida após alguns protótipos apresentados para o cliente, seguindo as melhores tendências do mercado para este contexto. A prototipação das delas pode ser vista nesta mesma documentação, no tópico [3 - Projeto de Interface](../docs/03-Projeto%20de%20Interface.md)

### Servidor

A aplicação foi publicada em um servidor ISS, tanto o Backend .NET quanto o Frontend React, e pode ser acessada neste link: mail.gpj.com.br:9198/