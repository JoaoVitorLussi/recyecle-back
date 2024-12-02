const express = require("express");
const router = express.Router();
const { Sequelize, QueryTypes } = require("sequelize");
const authMiddleware = require("../../../../../../middlewares/authMiddleware");

const sequelize = new Sequelize('receyecle', 'postgres', 'postgres', {
    host: 'localhost',
    port: '5432',
    dialect: 'postgres',
    logging: false,
});

router.get("/dashboard-ranking", authMiddleware, async function (req, resp) {
    try {
        const email = req.email;
        let query;
        query = `SELECT 
                classificacao, 
                COUNT(*) AS quantidade
            FROM 
                material
            GROUP BY 
                classificacao
            ORDER BY
                quantidade DESC`;

        const dados = await sequelize.query(query, {
            type: QueryTypes.SELECT,
        });
        resp.status(200).json(dados);
    } catch (error) {
        console.error("Erro ao executar a consulta:", error);
        resp.status(500).json({ error: "Erro ao buscar dados do banco de dados" });
    }
});

router.get("/dashboard-material-usuario", authMiddleware, async function (req, resp) {
    try {
        let usuarios;
        let dados;
        let email = req.email;
        let sql;
        let query;

        query = `SELECT u.nome
                FROM usuario u
                WHERE EXISTS (
                    SELECT 1
                    FROM material m
                    WHERE m.id_usuario = u.id
                )
                ORDER BY u.nome;`;            

        usuarios = await sequelize.query(query, {
            type: QueryTypes.SELECT,
        });

        sql = `WITH material_usuario_cte AS (
            SELECT
                c.nome_classificacao,
                u.nome AS nome_usuario,
                COALESCE(COUNT(m.id), 0) AS quantidade
            FROM
                    (SELECT DISTINCT classificacao AS nome_classificacao FROM material) c
                        CROSS JOIN
                usuario u
                        LEFT JOIN
                material m ON m.classificacao = c.nome_classificacao AND m.id_usuario = u.id
            WHERE
                u.flag_admin = true
            GROUP BY
                c.nome_classificacao, u.nome
        )
               SELECT
                   nome_classificacao AS name,
                   ARRAY_AGG(quantidade ORDER BY nome_usuario) AS data
               FROM
                   material_usuario_cte
               GROUP BY
                   nome_classificacao
               ORDER BY
                   nome_classificacao;`

        dados = await sequelize.query(sql, {
            type: QueryTypes.SELECT,
        });
        
        resp.status(200).json({ dados, usuarios });
    } catch (error) {
        console.error("Erro ao executar a consulta estoques:", error);
        resp.status(500).json({ error: "Erro ao buscar dados do estoque" });
    }
});

module.exports = router;
