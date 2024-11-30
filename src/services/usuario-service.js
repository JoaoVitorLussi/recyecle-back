const model = require('../module/receyecle/models');

async function getIdByEmail(email){
    let data = null;
    const usuario = await model.Usuario.schema('public');
    data = await usuario.findOne({
      where: { email: email },
      attributes: ['id', 'id_empresa', 'flag_admin']
    });
    return data;
  }

module.exports = {
    getIdByEmail
};
