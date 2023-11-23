import { createService, findAllService, countNews, topNewsService, findByIdService, searchByTitleService, byUserService, updateService, eraseService, likeNewsService, deleteLikeNewsService, addCommentService, deleteCommentService } from "../services/news.service.js"

const create = async (req, res) => {
    try {
        const { title, text, banner } = req.body

        if (!title || !text || !banner) {
            res.sendStatus(400, { message: "Envie todos os campos para o resgistro" })
        }

        await createService({
            title,
            text,
            banner,
            user: { _id: req.userId },
        })

        res.sendStatus(201)
    }

    catch (err) {
        res.status(500).send({ message: err.message })
    }
}

const findAll = async (req, res) => {

    try {
        let { limit, offset } = req.query

        limit = Number(limit)
        offset = Number(offset)

        if (!limit) {
            limit = 5
        }

        if (!offset) {
            offset = 1
        }
        const news = await findAllService(offset, limit)
        const total = await countNews()
        const currentURL = req.baseUrl
        const next = offset + limit
        const nextURL = next < total ? `${currentURL}?limit=${limit}&offset=${next}` : null

        const previous = offset - limit < 0 ? null : offset - limit
        const previousURL = previous !== null ? `${currentURL}?limit=${limit}&offset=${previous}` : null

        if (news.length === 0) {
            return res.sendStatus(400, { message: "Não há usuários cadastrados!" })
        }

        res.send({
            nextURL,
            previousURL,
            limit,
            offset,
            total,
            results: news.map(Item => ({
                id: Item._id,
                title: Item.title,
                text: Item.text,
                banner: Item.banner,
                likes: Item.likes,
                comments: Item.comments,
                name: Item.user.name,
                username: Item.user.username,
                avatar: Item.user.avatar,
            }))
        })
    }

    catch (err) {
        res.status(500).send({ message: err.message })
    }
}

const topNews = async (req, res) => {
    try {
        const news = await topNewsService()

        if (!news) {
            return res.status(200).send({ message: "Não há notícias cadastradas!" })
        }

        res.send({
            news: {
                id: news._id,
                title: news.title,
                text: news.text,
                banner: news.banner,
                likes: news.likes,
                comments: news.comments,
                name: news.user.name,
                username: news.user.username,
                avatar: news.user.avatar,
            },
        })
    }

    catch (err) {
        res.status(500).send({ message: err.message })
    }
}

const findById = async (req, res) => {
    try {
        const { id } = req.params
        const news = await findByIdService(id)

        res.send({
            news: {
                id: news._id,
                title: news.title,
                text: news.text,
                banner: news.banner,
                likes: news.likes,
                comments: news.comments,
                name: news.user.name,
                username: news.user.username,
                avatar: news.user.avatar,
            },
        })
    }

    catch (err) {
        res.status(500).send({ message: err.message })
    }
}

const searchByTitle = async (req, res) => {
    try {
        const { title } = req.query

        const findTitle = await searchByTitleService(title)

        if (findTitle.length === 0) {
            return res.sendStatus(400, { message: "Nenhuma notícia encontrada!" })
        }

        res.send({
            findTitle: findTitle.map(news => ({
                id: news._id,
                title: news.title,
                text: news.text,
                banner: news.banner,
                likes: news.likes,
                comments: news.comments,
                name: news.user.name,
                username: news.user.username,
                avatar: news.user.avatar,
            }))
        })
    }

    catch (err) {
        res.status(500).send({ message: err.message })
    }
}

const byUser = async (req, res) => {
    try {
        const id = req.userId
        const news = await byUserService(id)

        return res.send({
            results: news.map(Item => ({
                id: Item._id,
                title: Item.title,
                text: Item.text,
                banner: Item.banner,
                likes: Item.likes,
                comments: Item.comments,
                name: Item.user.name,
                username: Item.user.username,
                avatar: Item.user.avatar,
            })),
        })
    }
    catch (err) {
        res.status(500).send({ message: err.message })
    }
}

const update = async (req, res) => {
    try {
        const { title, text, banner } = req.body
        const { id } = req.params

        if (!title && !text && !banner) {
            res.status(400).send({ message: "Envie todos os campos para o resgistro" })
        }

        const news = await findByIdService(id)

        if (news.user._id != req.userId) {
            res.status(400).send({ message: "Ação não autorizada!" })
        }

        await updateService(id, title, text, banner)

        return res.status(400).send({ message: "Post atualizado com sucesso!" })
    }

    catch (err) {
        res.status(500).send({ message: err.message })
    }
}

const erase = async (req, res) => {
    try {
        const { id } = req.params
        const news = await findByIdService(id)

        if (news.user._id != req.userId) {
            res.status(400).send({ message: "Ação não autorizada!" })
        }

        await eraseService(id)
        return res.send({ message: "Post apagado com sucesso!" })
    }
    catch (err) {
        res.status(500).send({ message: err.message })
    }

}

const likeNews = async (req, res) => {
    try {
        const { id } = req.params
        const userId = req.userId

        const newsLiked = await likeNewsService(id, userId)
        console.log(newsLiked)

        if (!newsLiked) {
            await deleteLikeNewsService(id, userId)
            return res.status(200).send({ message: "Like removido com sucesso!" })
        }

        res.send({ message: "Like adicionado com sucesso!" })
    }

    catch (err) {
        res.status(500).send({ message: err.message })
    }
}

const addComment = async (req, res) => {

    try {

        const { id } = req.params
        const userId = req.userId
        const { comment } = req.body

        if (!comment) {
            return res.status(200).send({ message: "comentário adicionado com sucesso!" })
        }

        await addCommentService(id, comment, userId)

        res.send({ message: "Comentário adicionado com sucesso!" })
    }

    catch (err) {
        res.status(500).send({ message: err.message })
    }
}

const deleteComment = async (req, res) => {

    try {

        const { idNews, idComment } = req.params
        const userId = req.userId

        const commmentDeleted = await deleteCommentService(idNews, idComment, userId)
        console.log(commmentDeleted)

        const commentFinder = commmentDeleted.comments.find(comment => comment.idComment === idComment)

        if (commentFinder.userId !== req.userId) {
            return res.status(400).send({ message: "Ação não autorizada!" })
        }

        res.send({ message: "Comentário removido com sucesso!" })
    }

    catch (err) {
        res.status(500).send({ message: err.message })
    }
}

export { create, findAll, topNews, findById, searchByTitle, byUser, update, erase, likeNews, addComment, deleteComment } 