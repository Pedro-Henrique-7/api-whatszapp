// objetivo: API responsavel em criar endPoints referente a WhatsApp
// data: 24-09-2025
// autor: Pedro Henrique Oliveira da Silva
// versão 1.0
//
// obs: instalar dependencias para criar api
//      express - npm install express          --save isntala dependencias para criar uma api 
//      cors    - npm install cors             --save instala as dependencias para configurar as permissões de api
//      body-parser - npm install  body-parser --save  instala as dependencias para receber os tipos de dados via post ou put


const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const dados = require('./modules/functions.js')


//deifine a porta padrão da api, se for servidor de nuvem nao temos acesso a porta
    //EM EXECUÇÃO LOCAL PODEMOS DEFINIR A PORTA
const PORT  = process.PORT || 8080

//instancia da classe express
const app = express()

//config cors
app.use((request,response,next)=>{
    response.header('Acess-Control-Allow-Origin', '*') // Ip de Origem
    response.header('Acess-Control-Allow-Methods', 'GET') //  Metodos Http

    app.use(cors())
    next() //Ler os proximos end points 
})

app.get('/v1/whatsapp/listarContatos', function(request, response){
    let users = dados.getAllUsers()
  
    response.status(users.statuscode) 
    response.json(users) 
  
  })

  app.get('/v1/whatsapp/perfil/:number', function(request, response){
    let number = request.params.number
    let users = dados.getSpecifcProfileByNumber(number)
  
    response.status(users.statuscode) 
    response.json(users) 
  
  })

  app.get('/v1/whatsapp/contato/:number', function(request, response){
    let number = request.params.number
    let users = dados.getAllContactsByNumber(number)
  
    response.status(users.statuscode) 
    response.json(users) 
  
  })

  app.get('/v1/whatsapp/userMessages/:number', function(request, response){
    let number = request.params.number
    let users = dados.getAllMessagesByNumber(number)
  
    response.status(users.statuscode) 
    response.json(users) 
  
  })


  app.listen(PORT, function(){
    console.log("Api aguardando requisições (:D)")
})
  