import {createService, findAllService} from "../services/news.service.js"

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
    
    try{ const news = await findAllService()

    if (news.length === 0) {
        return res.sendStatus(400, { message: "Não há usuários cadastrados!" })
    }

    res.send(news)}
    
    catch(err){
        res.status(500).send({message: err.message})
    }
}

export {create, findAll} 