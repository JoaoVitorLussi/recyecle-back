const express = require("express");
const router = express.Router();
const model = require("../../../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../../../../../..//middlewares/authMiddleware");
const usuarioSevice = require("../../../../../services/usuario-service");
const { Op } = require("sequelize");

router.post("/usuario", async function (req, resp) {
  const { nome, email, telefone, senha, nome_empresa, cnpj } = req.body;
  try {
    let usuarioExists = await model.Usuario.findOne({
      where: {
        email,
      },
    });

    if (usuarioExists) {
      return resp
        .status(400)
        .json({ error: "Já existe um usuário com esse email." });
    }

    let empresaExists = await model.Empresa.findOne({
      where: {
        cnpj: cnpj,
      },
    });

    if (empresaExists) {
      return resp
        .status(400)
        .json({ error: "Já existe um empresa com esse cnpj." });
    }

    const empresa = await model.Empresa.schema("public");
    let data_empresa = await empresa.create({ nome: nome_empresa, cnpj: cnpj });

    let token = await bcrypt.hash(senha, 10);

    let data = null;
    const usuario = await model.Usuario.schema("public");
    data = await usuario.create({
      nome,
      email,
      telefone,
      senha: token,
      id_empresa: data_empresa.id,
      flag_admin: true,
    });
    resp.json({ detail: "Usuário criado com sucesso" }).status(201);
  } catch (error) {
    console.error("Erro ao criar administrador:", error);
    resp.status(500).json({ error: "Erro ao criar usuário." });
  }
});

router.get("/usuario", authMiddleware, async function (req, res) {
  try {
    let { search = "" } = req.query;
    let user = await usuarioSevice.getIdByEmail(req.email);
    let data = null;
    if (user.id === 1) {
      const usuario = await model.Usuario.schema("public");
      data = await usuario.findAll({
        where: {
          deletedAt: null,
          nome: {
            [Op.like]: `%${search}%`,
          },
        },
      });
      res.json(data).status(200);
    } else {
      const usuario = await model.Usuario.schema("public");
      data = await usuario.findAll({
        where: {
          id_empresa: user.id_empresa,
          deletedAt: null,
          nome: {
            [Op.like]: `%${search}%`,
          },
        },
      });
      res.json(data).status(200);
    }
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    res.status(500).json({ error: "Erro ao buscar usuários." });
  }
});

router.get("/usuario/:id", authMiddleware, async function (req, resp) {
  try {
    let data = null;
    const admin = await model.Usuario.schema("public");
    data = await admin.findByPk(req.params.id);
    if (data == null) {
      resp.status(404).json({ error: "Administrador não encontrado." });
    }
    resp.json(data).status(200);
  } catch (error) {
    console.error("Erro ao buscar administrador:", error);
    resp.status(500).json({ error: "Erro ao buscar administrador." });
  }
});

router.delete("/usuario/:id", authMiddleware, async function (req, resp) {
  try {
    const { id } = req.params;
    if (id == 1) {
      resp
        .status(400)
        .json({ error: "Não é possível deletar o administrador principal." });
      return;
    }

    let user = await usuarioSevice.getIdByEmail(req.email);

    if (user.id == id) {
      resp
        .status(400)
        .json({ error: "Não é possível deletar o usuário logado." });
      return;
    }

    let data = null;
    const now = new Date();
    const usuario = await model.Usuario.schema("public");
    let usuarioAdmin = await usuario.findOne({ where: { id: id } });

    if (usuarioAdmin.flag_admin == true) {
      resp
        .status(400)
        .json({ error: "Não é possível deletar usuários administradores." });
      return;
    }

    const userToDelete = await usuario.findOne({ where: { id: id } });

    if (!userToDelete) {
      return resp.status(406).json({ error: "Usuário não encontrado." });
    }

    data = await usuario.update({ deletedAt: now }, { where: { id: id } });

    resp.status(200).json({ detail: "Usuário deletado" });
  } catch (error) {
    console.error("Erro ao deletar usuário:", error);
    resp.status(500).json({ error: "Erro ao deletar usuário." });
  }
});

router.post("/cadastro-usuario", authMiddleware, async function (req, resp) {
  try {
    let user = await usuarioSevice.getIdByEmail(req.email);
    let data = null;

    const usuario = await model.Usuario.schema("public");

    let usuarioExists = await model.Usuario.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (usuarioExists) {
      return resp
        .status(400)
        .json({ error: "Já existe um usuário com esse email." });
    }

    let token = await bcrypt.hash(req.body.senha, 10);

    data = await usuario.create({
      nome: req.body.nome,
      email: req.body.email,
      telefone: req.body.telefone,
      senha: token,
      id_empresa: user.id_empresa,
    });
    resp.json({ detail: "Usuário criado com sucesso" }).status(201);
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    resp.status(500).json({ error: "Erro ao criar usuário." });
  }
});

router.put("/usuario/:id", authMiddleware, async function (req, resp) {
  try {
    if (req.params.id == 1) {
      resp
        .status(400)
        .json({ error: "Não é possível editar o administrador principal." });
      return;
    }
    const usuario = await model.Usuario.schema("public");
    let data = null;

    if (req.body.senha) {
      let token = await bcrypt.hash(req.body.senha, 10);
      data = await usuario.update(
        { senha: token },
        { where: { id: req.params.id } }
      );
    }

    data = await usuario.update(
      {
        nome: req.body.nome,
        email: req.body.email,
        telefone: req.body.telefone,
      },
      { where: { id: req.params.id } }
    );
    resp.json({ detail: "Usuário editado com sucesso" }).status(200);
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    resp.status(500).json({ error: "Erro ao atualizar usuário." });
  }
});

module.exports = router;
