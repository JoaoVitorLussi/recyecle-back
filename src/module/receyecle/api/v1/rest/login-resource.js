const express = require('express');
const router = express.Router();
const model = require('../../../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
  
router.post('/login', async function (req, resp) {
    try{
      const {email, senha} = req.body;
       let usuario = await model.Usuario.findOne({
         where: {
           email
         }
       });

       if (!usuario || !(await bcrypt.compare(senha, usuario.senha))) {
         return resp.status(403).send({
           type: 'error',
           message: 'Usuário ou senha incorretos!'
         });
       }

       let token = jwt.sign(
         { usuarioId: usuario.id, nome: usuario.nome },
         process.env.TOKEN_KEY, 
         { expiresIn: '1h' }
       );
   
       usuario.token = token;
       await usuario.save();
   
       return resp.status(200).send({
         type: 'sucess',
         message: 'Bem-vindo! Login realizado com sucesso!',
         token,
         email: usuario.email,
         admin_flag: usuario.flag_admin
       });


    }catch (error) {
       console.error("Erro ao logar:", error);
       resp.status(500).json({ error: "Erro ao logar." });
    }
});



module.exports = router;
