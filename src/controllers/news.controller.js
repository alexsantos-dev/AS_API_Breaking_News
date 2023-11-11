import {createService, findAllService, countNews, topNewsService} from "../services/news.service.js"

const create = async (req, res) => {
    try{ const {title, text, banner} = req.body

        if(!title || !text || !banner){
            res.sendStatus(400, {message: "Envie todos os campos para o resgistro"})
        }

        await createService({
            title,
            text,
            banner,
            user: {_id: "654e72547a0b26e140f002c0"},
        })

        res.sendStatus(201)}

    catch(err){
        res.status(500).send({message: err.message})
    }
}

const findAll = async (req, res) =>{
    
 try{ let {limit, offset} = req.query

    limit = Number(limit)
    offset = Number(offset)

    if(!limit){
        limit = 5
    }

    if(!offset){
        offset = 0
    }
        const news = await findAllService(offset, limit)
        const total = await countNews()
        const currentURL = req.baseUrl
        const next = offset + limit
        const nextURL = next < total ? `${currentURL}?limit=${limit}&offset=${next}` : null

        const previous = offset - limit < 0 ? null :  offset -  limit
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
    })}
    
    catch(err){
        res.status(500).send({message: err.message})
    }
}

const topNews = async (req, res) =>{
   try{ const news = await topNewsService()
    
    if(!news){
        return res.send(400).send({ message: "Não há usuários cadastrados!" })
    }
    res.send({
            news:{
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
    })}

    catch(err){
        res.status(500).send({message: err.message})
    }
}

export {create, findAll, topNews} 