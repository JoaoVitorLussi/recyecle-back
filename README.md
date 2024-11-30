# recyecle-back
Projeto voltado para ABEX VI envolvendo uma aplicação I.A com intuito de separaração de materiais recicláveis


# Para rodar o projeto
# execute o seguinte comando em um terminal
$ docker-compose -f docker-compose.yml up

# Abra um novo terminal separado e execute o seguinte comando
$ npm i
$ npm run dev

# E em outro terminal execute o seguinte comando
$ cd src/module/recyecle-back
$ npx sequelize-cli db:migrate
$ npx sequelize-cli db:seed:all
