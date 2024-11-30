const express = require("express");
const router = express.Router();
const model = require("../../../models");
const authMiddleware = require("../../../../../../middlewares/authMiddleware");
const { Op } = require("sequelize");
const usuarioSevice = require("../../../../../services/usuario-service");

router.post("/empresa", authMiddleware, async function (req, resp) {
  const { nome, cnpj } = req.body;
  try {
    let empresaExists = await model.Empresa.findOne({
      where: {
        cnpj: cnpj,
      },
    });

    if (empresaExists) {
      return resp
        .status(200)
        .json({ error: "Já existe uma empresa com esse cnpj." });
    }

    let data = null;
    const empresa = await model.Empresa.schema("public");
    data = await empresa.create({ nome: nome, cnpj: cnpj });
    resp.json({ detail: "Empresa criada com sucesso" }).status(200);
  } catch (error) {
    console.error("Erro ao criar empresa:", error);
    resp.status(500).json({ error: "Erro ao criar empresa." });
  }
});

router.get("/empresa", authMiddleware, async function (req, resp) {
  try {
    let { search = "" } = req.query;
    let data = null;
    const empresa = await model.Empresa.schema("public");

    data = await empresa.findAll({
      where: {
        nome: {
          [Op.like]: `%${search}%`,
        },
      },
    });

    if (data == null) {
      resp.status(404).json({ error: "Nenhuma empresa encontrada." });
    }
    resp.json(data).status(200);
  } catch (error) {
    console.error("Erro ao buscar empresa:", error);
    resp.status(500).json({ error: "Erro ao buscar empresa." });
  }
});

router.get("/empresa/:id", authMiddleware, async function (req, resp) {
  try {
    let data = null;
    const empresa = await model.Empresa.schema("public");
    data = await empresa.findByPk(req.params.id);
    if (data == null) {
      resp.status(404).json({ error: "Nenhuma empresa encontrada." });
    }
    resp.json(data).status(200);
  } catch (error) {
    console.error("Erro ao buscar empresa:", error);
    resp.status(500).json({ error: "Erro ao buscar empresa." });
  }
});

router.put("/empresa/:id", authMiddleware, async function (req, resp) {
  try {
    let data = null;
    const empresa = await model.Empresa.schema("public");
    data = await empresa.update(req.body, { where: { id: req.params.id } });
    resp.json({ detail: "Empresa editada com sucesso" }).status(200);
  } catch (error) {
    console.error("Erro ao atualizar empresa:", error);
    resp.status(500).json({ error: "Erro ao atualizar empresa." });
  }
});

router.delete("/empresa/:id", authMiddleware, async function (req, resp) {
  try {
    let data = null;
    const empresa = await model.Empresa.schema("public");
    const estoque = await model.Estoque.schema("public");

    let estoquesEmpresa = await estoque.findAll({ where: { id_empresa: req.params.id } })

    if (estoquesEmpresa.length > 0) {
      resp.status(400).json({ error: "Não é possível deletar a empresa, pois existem estoques associados a ela." });
      return;
    }

    data = await empresa.destroy({ where: { id: req.params.id } });
    if (data == 0) {
      resp.status(404).json({ error: "Empresa não encontrada." });
    } else {
      resp.status(200).json({ detail: "Empresa deletada com sucesso." });
    }
  } catch (error) {
    console.error("Erro ao deletar empresa:", error);
    resp.status(500).json({ error: "Erro ao deletar empresa." });
  }
});

module.exports = router;
