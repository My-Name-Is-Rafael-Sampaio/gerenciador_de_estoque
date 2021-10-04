const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const tableUsers = require('./models/user');
const tableProducts = require('./models/product');
const { validation } = require('./middlewares/auth');
const { authSecret } = require('./.env');
const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-type, Authorization");
    app.use(cors());
    next();
});

app.post("/registerUser", validation, async (req, res) => {
    const data = req.body;

    try {
        const userFromDb = await tableUsers.findOne({
            attributes: ['email'],
            where: {
                email: data.email
            }
        });

        if (!data.id) {
            return res.status(400).json({
                erro: true,
                msg: "E-mail inserido já pertence a um usuário!"
            })
        }
    } catch (msg) {
        return res.status(400).send(msg)
    }

    data.password = await bcrypt.hash(data.password, 8);

    await tableUsers.create(data)
        .then(() => {
            return res.json({
                erro: false,
                msg: "Usuário cadastrado com sucesso!"
            });
        })
        .catch(() => {
            return res.status(400).json({
                erro: true,
                msg: "Falha ao cadastrar o usuário!"
            });
        })
});

app.post("/login", async (req, res) => {
    const user = await tableUsers.findOne({
        attributes: ['id', 'name', 'email', 'password'],
        where: {
            email: req.body.email,

        }
    });

    if (user === null) {
        return res.status(400).json({
            erro: true,
            msg: "Usuário ou senha incorreta!"
        })
    }

    if (!(await bcrypt.compare(req.body.password, user.password))) {
        return res.status(400).json({
            erro: true,
            msg: "Usuário ou senha incorreta!"
        })
    }

    let token = jwt.sign({ id: user.id }, authSecret, {
        expiresIn: 3000
    });

    return res.json({
        erro: false,
        token
    });
});

app.get("/validateToken", validation, async (req, res) => {
    await tableUsers.findByPk(req.userId, { attributes: ['id', 'name', 'email'] })
        .then((user) => {
            return res.json({
                erro: false,
                user: user
            });
        })
        .catch(() => {
            return res.status(400).json({
                erro: true,
                msg: "É necessário realizar o login!"
            });
        });
});

app.get("/listUsers", validation, async (req, res) => {
    await tableUsers.findAll({
        attributes: ['id', 'name', 'email'],
        order: [['id', 'DESC']]
    })
        .then((users) => {
            return res.json({
                erro: false,
                users: users
            });
        })
        .catch(() => {
            return res.status(400).json({
                erro: true,
                msg: "Nenhum usuário encontrado!"
            });
        });
});

app.get("/viewUser/:id", validation, async (req, res) => {
    const id = req.params.id;

    await tableUsers.findByPk(id, {
        attributes: ['id', 'name', 'imageUrl', 'email'],
        order: [['id', 'DESC']]
    })
        .then((user) => {
            return res.json({
                erro: false,
                user: user
            });
        })
        .catch(() => {
            return res.status(400).json({
                erro: true,
                msg: "Nenhum usuário encontrado!"
            });
        });
});

app.put("/editUser", validation, async (req, res) => {
    const { id } = req.body;

    const data = req.body;

    data.password = await bcrypt.hash(data.password, 8);

    await tableUsers.update(data, { where: { id } })
        .then(() => {
            return res.json({
                erro: false,
                msg: "Usuário editado com sucesso!"
            });
        })
        .catch(() => {
            return res.status(400).json({
                erro: true,
                msg: "Falha ao editar o usuário!"
            });
        });
});

app.delete("/deleteUser/:id", validation, async (req, res) => {
    const id = req.params.id;

    await tableUsers.destroy({ where: { id: id } })
        .then(() => {
            return res.json({
                erro: false,
                msg: "Usuário deletado com sucesso!"
            });
        })
        .catch(() => {
            return res.status(400).json({
                erro: true,
                msg: "Falha ao deletar o usuário!"
            });
        })
});

app.post("/registerProduct", validation, async (req, res) => {
    const data = req.body;

    try {
        const productFromDb = await tableProducts.findOne({
            attributes: ['name'],
            where: {
                name: data.name
            }
        });

        if (!data.id) {
            return res.status(400).json({
                erro: true,
                msg: "Já existe um produto com esse nome!"
            })
        }
    } catch (msg) {
        return res.status(400).send(msg)
    }


    await tableProducts.create(data)
        .then(() => {
            return res.json({
                erro: false,
                msg: "Produto cadastrado com sucesso!"
            });
        })
        .catch(() => {
            return res.status(400).json({
                erro: true,
                msg: "Falha ao cadastrar o produto!"
            });
        })
});

app.get("/listProducts", validation, async (req, res) => {
    await tableProducts.findAll({
        attributes: ['id', 'name', 'imageUrl', 'purchasePrice', 'salePrice', 'inventory'],
        order: [['id', 'DESC']]
    })
        .then((products) => {
            return res.json({
                erro: false,
                products: products
            });
        })
        .catch(() => {
            return res.status(400).json({
                erro: true,
                msg: "Nenhum produto encontrado!"
            });
        });
});

app.get("/viewProduct/:id", validation, async (req, res) => {
    const id = req.params.id;

    await tableProducts.findByPk(id, {
        attributes: ['id', 'name', 'imageUrl', 'purchasePrice', 'salePrice', 'inventory'],
        order: [['id', 'DESC']]
    })
        .then((product) => {
            return res.json({
                erro: false,
                product: product
            });
        })
        .catch(() => {
            return res.status(400).json({
                erro: true,
                msg: "Nenhum produto encontrado!"
            });
        });
});

app.put("/editProduct", validation, async (req, res) => {
    const { id } = req.body;

    await tableProducts.update(req.body, { where: { id } })
        .then(() => {
            return res.json({
                erro: false,
                msg: "Produto editado com sucesso!"
            });
        })
        .catch(() => {
            return res.status(400).json({
                erro: true,
                msg: "Falha ao editar o produto!"
            });
        });
});

app.delete("/deleteProduct/:id", validation, async (req, res) => {
    const id = req.params.id;

    await tableProducts.destroy({ where: { id: id } })
        .then(() => {
            return res.json({
                erro: false,
                msg: "Produto deletado com sucesso!"
            });
        })
        .catch(() => {
            return res.status(400).json({
                erro: true,
                msg: "Falha ao deletar o produto!"
            });
        })
});

app.listen(8080, () => {
    console.log('Backend executando...');
})