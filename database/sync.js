const models = require('../models');


models.sync({ force: true }).then(() => {
  // Now the `users` table in the database corresponds to the model definition
  models.user_role.create({
    id: 1,
    role: 'ADMIN'
  });
  models.user_role.create({
    id: 2,
    role: 'LISTENER'
  });
});