const express = require("express")
const app = express();
const teste = express();

app.get("/", (req, res) => {
    res.send("Aoba Garai!")
})

teste.get("/teste", (req, res) => {
    res.send("Isso só pq eu tava testando ele ;)")
})

teste.get("/laele", (req, res) => {
    const sum = 100 + 1
    res.json({sum: sum})
})

teste.listen(3300)
app.listen(3000)