
const express = require("express")
const cors = require("cors")
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const bcrypt = require('bcrypt');
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

const usuarioSchema = mongoose.Schema({
    login: {type: String, unique: true, required: true},
    senha: {type: String, required: true}
})
usuarioSchema.plugin(uniqueValidator);
const Usuario = mongoose.model ("Usuario", usuarioSchema);

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
app.post("/signup", async (req, res) =>{
    try{
        const login = req.body.login;
        const senha = req.body.senha;
        const criptografada = await bcrypt.hash(senha, 10)
        const usuario = new Usuario({login: login, senha: criptografada})
        const respostaMongo = await usuario.save();
        console.log(respostaMongo);
        res.status(201).end();
    }
    catch(e){
        console.log(e);
        res.status(409).end()
    }
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