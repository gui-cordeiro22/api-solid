# App

- GymPass style app

# RFs (Requisitos Funcionais)
/*Feature e funcionalidades da aplicação*/
- [] Eu, como usuário, desejo que seja possível me cadastrar na aplicação;
- [] Eu, como usuário, desejo que seja possível me autenticar na aplicação;
- [] Eu, como usuário, desejo que seja possível acessar o meu perfil quando estiver logado;
- [] Eu, como usuário, desejo obter o nº de check-ins realizados pelo usuário logado;
- [] Eu, como usuário, desejo ter acesso ao meu histórico de check-ins;
- [] Eu, como usuário, desejo que seja possível buscar academias próximas a mim ao usar a aplicação;
- [] Eu, como usuário, desejo conseguir buscar uma academia específica pelo seu nome;
- [] Eu, como usuário, desejo conseguir realizar check-in em uma academia;
- [] Eu, como time de desenvolvimento, desejo que seja possível validar o check-in de um usuário;
- [] Eu, como time de desenvolvimento, desejo que seja possível cadastrar uma academia;

# RNs (Regras de Negócios)
/*Caminhos que a aplicação pode tomar*/
- [] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [] O usuário não pode fazer 2 check-ins no mesmo dia;
- [] O usuário não pode fazer check-in se não estiver próximo o suficiente (100m) da academia;
- [] O check-in só pode ser validado até 20min após criado;
- [] O check-in só pode ser validado por administradores;
- [] A academia só pode ser cadastrada por administradores;

# RNFs (Requisitos não funcionais)
/*Tecnologias empregadas*/
- [] A senha do usuário precisa estar criptografada;
- [] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [] Todas as listas de dados precisam estar paginadas com 20 itens por páginas;
- [] o usuário deve ser identificado por um JWT (JSON Web Token);
