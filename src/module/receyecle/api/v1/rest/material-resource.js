const express = require("express")
const router = express.Router()
const model = require("../../../models")
const authMiddleware = require("../../../../../../middlewares/authMiddleware")
const { Op } = require("sequelize")
const axios = require("axios")

// Criar material
router.post("/material", authMiddleware, async (req, resp) => {
    const { classificacao_usuario, base_64, id_usuario } = req.body

    if (!base_64 || !id_usuario) {
        return resp.status(400).json({ error: "Campos base_64 e id_usuario são obrigatórios." })
    }
    console.log(base_64)
    try {
        // const iaResponse = await axios.post("http://127.0.0.1:5000/predict", { imagem: base_64 })
        // const classificacao = iaResponse.data[0] || "Não classificado"

        // const material = await model.Material.schema("public").create({
        //     classificacao,
        //     classificacao_usuario,
        //     base_64,
        //     id_usuario,
        //     created_at: new Date(),
        //     updated_at: new Date(),
        // })

        // resp.status(200).json({ detail: "Material criado com sucesso", material })
    } catch (error) {
        console.error("Erro ao criar material:", error)
        resp.status(500).json({ error: "Erro ao criar material." })
    }
})

// Listar materiais
router.get("/material", authMiddleware, async (req, resp) => {
    try {
        const { search = "" } = req.query

        const materiais = await model.Material.schema("public").findAll({
            where: {
                classificacao: {
                    [Op.like]: `%${search}%`,
                },
            },
        })

        if (materiais.length === 0) {
            return resp.status(404).json({ error: "Nenhum material encontrado." })
        }

        resp.status(200).json(materiais)
    } catch (error) {
        console.error("Erro ao listar materiais:", error)
        resp.status(500).json({ error: "Erro ao listar materiais." })
    }
})

// Buscar material por ID
router.get("/material/:id", authMiddleware, async (req, resp) => {
    try {
        const material = await model.Material.schema("public").findByPk(req.params.id)

        if (!material) {
            return resp.status(404).json({ error: "Material não encontrado." })
        }

        resp.status(200).json(material)
    } catch (error) {
        console.error("Erro ao buscar material:", error)
        resp.status(500).json({ error: "Erro ao buscar material." })
    }
})

// Atualizar material
router.put("/material/:id", authMiddleware, async (req, resp) => {
    const { classificacao_usuario, base_64 } = req.body

    try {
        let classificacao = null
        if (base_64) {
            const iaResponse = await axios.post("http://127.0.0.1:5000/predict", { imagem: base_64 })
            classificacao = iaResponse.data[0] || "Não classificado"
        }

        const [updated] = await model.Material.schema("public").update(
            {
                classificacao,
                classificacao_usuario,
                base_64,
                updated_at: new Date(),
            },
            { where: { id: req.params.id } }
        )

        if (!updated) {
            return resp.status(404).json({ error: "Material não encontrado." })
        }

        resp.status(200).json({ detail: "Material atualizado com sucesso." })
    } catch (error) {
        console.error("Erro ao atualizar material:", error)
        resp.status(500).json({ error: "Erro ao atualizar material." })
    }
})

// Deletar material
router.delete("/material/:id", authMiddleware, async (req, resp) => {
    try {
        const deleted = await model.Material.schema("public").destroy({
            where: { id: req.params.id },
        })

        if (!deleted) {
            return resp.status(404).json({ error: "Material não encontrado." })
        }

        resp.status(200).json({ detail: "Material deletado com sucesso." })
    } catch (error) {
        console.error("Erro ao deletar material:", error)
        resp.status(500).json({ error: "Erro ao deletar material." })
    }
})

module.exports = router
