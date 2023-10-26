const express = require('express')
const app = express();
app.use(express.json())

let filmes = [
    {
    titulo: "Forrest Gump - O Contador de Histórias",
    sinopse: "Quarenta anos da história dos Estados Unidos, vistos pelos olhos de Forrest Gump (Tom Hanks),um rapaz com QI abaixo da média e boas intenções."
    },
    {
    titulo: "Um Sonho de Liberdade",
    sinopse: "Em 1946, Andy Dufresne (Tim Robbins), um jovem e bem sucedido banqueiro, tem a sua vida radicalmente modificada ao ser condenado por um crime que nunca cometeu, o homicídio de sua esposa e do amante dela"
    }
]
			
//acesso para requisicao http-get /oi
app.get('/oi', (req, res) => {res.send('oi')})

//acesso para requisicao http-get /filmes
app.get('/filmes', (req, res) => {res.send(filmes)})

//acesso para requisicao http-post /filmes, ou seja, vamos inserir um novo filme em memoria
app.post('/filmes', (req, res) => {
    const titulo = req.body.titulo;
    const sinopse = req.body.sinopse;
    //montar objeto json que sera inserido
    const filme = {titulo: titulo, sinopse: sinopse}
    //inserir o novo filme na base
    filmes.push(filme);
    //p conferir
    res.send(filmes)
})
app.listen(3000, () => console.log('app up & running'))