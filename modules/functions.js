// objetivo: arquivo responsavél pelas funções para criar a API de whatszapp
// data: 24-09-2025
// autor: Pedro Henrique Oliveira da Silva
// versão 1.0

//import do json
const { json } = require('body-parser')
const dados = require('./contatos.js')

//mensagem padrão de erro
const MESSAGE_ERRO = {
    status : false, statuscode: 500, development: 'Pedro Henrique Oliveira da Silva'
}


//listar todos os usuários independente do número
const getAllUsers = function(){
    let message = {
        status: true,
        statuscode: 200,
        development: "Pedro Henrique Oliveira da Silva",    
        users: []
    }
    let dadosContato = JSON.parse(JSON.stringify(dados))
    dadosContato.contatos['whats-users'].forEach(function(profiles){
        let id = profiles.id
        let criado = profiles['created-since'].start
        let encerrado = profiles['created-since'].end
        let nome = profiles.account
        let apelido = profiles.nickname
        let numero = profiles.number
        let foto = profiles['profile-image']
        let corDeFundo = profiles.background
        let contatos = profiles['contacts']
        message.users.push({id, criado, encerrado, nome, apelido, numero, foto, corDeFundo, contatos})

    })
    
    if(message.criado === "")
        return MESSAGE_ERRO
    else
        return message
}

//função para buscar dados de um usuario de acordo com o numero especificado
const getSpecifcProfileByNumber = function(number){

    let message = {
        status: true,
        statuscode: 200,
        development: "Pedro Henrique Oliveira da Silva",    
        user: []
    }
    let dadosContato = JSON.parse(JSON.stringify(dados))    
    let profile = dadosContato.contatos['whats-users'].find(profile => profile.number == number)

    if(profile){
        let id = profile.id
        let criado = profile['created-since'].start
        let encerrado = profile['created-since'].end
        let nome = profile.account
        let apelido = profile.nickname
        let numero = profile.number
        let foto = profile['profile-image']
        let corDeFundo = profile.background
        message.user.push({id, criado, encerrado, nome, apelido, numero, foto, corDeFundo})
        return message
    }else{
        return MESSAGE_ERRO
    }
}

// função que lista todos os contatos de acordo com o numero passado como parametro

const getAllContactsByNumber = function(number){
    let message = {
        status: true,
        statuscode: 200,
        development: "Pedro Henrique Oliveira da Silva",    
        contacts: []
    }
    let dadosContato = JSON.parse(JSON.stringify(dados))
    let user = dadosContato.contatos['whats-users'].find(profile => profile.number == number)
    
    if(user){
        let contact = user['contacts']
        contact.forEach(function(item){
            let nome = item.name
            let foto = item.image
            let descricao = item.description
            message.contacts.push({nome, foto, descricao})
            
        })
        return message
    }else{
        return MESSAGE_ERRO
    }
    
}

//função para listar todas as mensagens de acordo com o numero
const getAllMessagesByNumber = function(number){
    let message = {
        status: true,
        statuscode: 200,
        development: "Pedro Henrique Oliveira da Silva",    
        mensagens: []
    }
    let dadosContato = JSON.parse(JSON.stringify(dados))
    let user = dadosContato.contatos['whats-users'].find(profile => profile.number == number)
    let contact = user['contacts']
    
    contact.forEach(function(item){
        message.mensagens.push(item['messages'])  
    })
    return message
}

//Listar uma conversa de um usuario e um contato apartir de um numero de usuario e o numero do contato
const getMessageWithAUserByNumber = function(senderNumber, reciverNumber){
    let message = {
        status: true,
        statuscode: 200,
        development: "Pedro Henrique Oliveira da Silva",
        perfil:"",  
    }
    let dadosContato = JSON.parse(JSON.stringify(dados))
    let senderContact = dadosContato.contatos['whats-users'].find(senderProfile => senderProfile.number === senderNumber)
    let reciverContact = senderContact['contacts'].find(reciverProfile => reciverProfile.number === reciverNumber)
    if(senderContact && reciverContact){
        message.perfil = senderContact
        senderContact.contacts = [reciverContact]
        return message
    }else{
        return MESSAGE_ERRO
    }
}

//função que faz a filtragem utilizando uma palavra chave na conversa entre usuarios
const getMessageByKeyword = function(senderNumber, reciverNumber, keyword){
    let message = {
        status: true,
        statuscode: 200,
        development: "Pedro Henrique Oliveira da Silva",
        perfil:"",  
    }
    let dadosContato = JSON.parse(JSON.stringify(dados))
    let senderContact = dadosContato.contatos['whats-users'].find(senderProfile => senderProfile.number === senderNumber)
    let reciverContact = senderContact['contacts'].find(reciverProfile => reciverProfile.number === reciverNumber)

    
    let word = reciverContact.messages.filter(wordFilter => wordFilter.content.includes(keyword))
    if(reciverContact && senderContact && word){
        message.perfil = senderContact
        reciverContact.messages = word
        senderContact.contacts = []
        senderContact.contacts.push(word)
        return message
    }else{
        return MESSAGE_ERRO
    }
}
// //
// getAllUsers()
// getSpecifcProfileByNumber('11955577796')
// getAllContactsByNumber('11966578996')
// getAllMessagesByNumber('11966578996')
// getMessageWithAUserByNumber('11966578996', '26999999920')
//  getMessageByKeyword('11955577796', '26999999920','Hey')
module.exports={
    getAllUsers,
    getSpecifcProfileByNumber,
    getAllContactsByNumber,
    getAllMessagesByNumber,
    getMessageWithAUserByNumber,
    getMessageByKeyword
}