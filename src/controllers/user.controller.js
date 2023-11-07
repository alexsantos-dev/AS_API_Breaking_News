const userService = require("../services/user.service")

const createService = async (req, res) => {
    const { name, username, email, password, avatar, background } = req.body

    if (!name || !username || !email || !password || !avatar || !background) {
        res.status(400).send({ message: "Envie todos os campos para resgistro" })
    }

    const user = await userService.createService(req.body)

    if (!user) {
        return res.status(400).send({ message: "Erro na criação do usuário!" })
    }

    res.status(201).send({
        message: "Usuário criado com sucesso!",
        user: {
            id: user._id,
            name,
            username,
            email,
            avatar,
            background,
        },
    });
};

const findAll = async (req, res) => {
    const users = await userService.findAllService()

    if (users.lenght === 0) {
        return res.status(400).send({ message: "Não há usuários cadastrados!" })
    }

    res.send(users)
}

const findById = async (req, res) => {

    const user = req.user

    res.send(user)
}

const update = async (req, res) => {
    const { name, username, email, password, avatar, background } = req.body

    if (!name && !username && !email && !password && !avatar && !background) {
        res.status(400).send({ message: "Envie ao menos um campo para o update" })
    }

    const {user, id} = req 

    await userService.updateService(id, name, username, email, password, avatar, background)

    res.send({message: "Usuário atualizado com sucesso!"})
}

module.exports = { createService, findAll , findById, update};