
const express = require("express")
const cors = require("cors")
const mongoose = require('mongoose')
//const req = require("express/lib/request")
const app = express()

//string de conexãp protoclo://servidor:porta/acessos               (req, res, next) req = requisição res = resposta next = encadeamento (nn obrigatorio)

app.use(express.json())
app.use(cors())

async function conectarMongoDB(){
    await mongoose.connect(`mongodb+srv://pituco:mznxbcvg2@pitucooh.8ecyqf5.mongodb.net/?retryWrites=true&w=majority`)
}

const Filme = mongoose.model("Filme", mongoose.Schema({
    titulo: {type: String},
    sinopse: {type: String}
}))

//acesso para requisção http-get /oi
app.get("/oi", (req, res) => {res.send('oi')})

//acesso para requisição http-get /filmes
app.get("/filmes", async (req, res) => {
    const filmes = await Filme.find();
    res.json(filmes);
})    

//acesso para requisição http-post /filmes. ou seja, vamos inserir um novo filme na !lista em memória!
app.post ("/filmes", async (req, res) => {
    //obter dados que serão inseridos
    const titulo = req.body.titulo
    const sinopse = req.body.sinopse
    //montar o objeto json que sera inserido
    const filme = new Filme({titulo: titulo, sinopse:sinopse})
    //inserir o novo filme no vetor filme
    await filme.save();
    //trazemos do banco entao a colecao atualizada
    const filmes = await Filme.find();
    //só para conferir (nn é necessario)
    res.send(filmes)
})
app.listen(3000, () => {
    try{
        conectarMongoDB();
        console.log("conexao ok e app up & running");
    }
    catch(e){
        console.log("erro: ", e);
    }
})