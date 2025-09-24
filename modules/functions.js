// objetivo: arquivo responsavél pelas funções para criar a API de whatszapp
// data: 24-09-2025
// autor: Pedro Henrique Oliveira da Silva
// versão 1.0

//import do json
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

    dados.contatos['whats-users'].forEach(function(profiles){
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

    let profile = dados.contatos['whats-users'].find(profile => profile.number == number)

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

    let user = dados.contatos['whats-users'].find(profile => profile.number == number)
    let contact = user['contacts']
    contact.forEach(function(item){
        let nome = item.name
        let foto = item.image
        let descricao = item.description
        message.contacts.push({nome, foto, descricao})
        
    })
    return message
}

//função para listar todas as mensagens de acordo com o numero
const getAllMessagesByNumber = function(number){
    let message = {
        status: true,
        statuscode: 200,
        development: "Pedro Henrique Oliveira da Silva",    
        mensagens: []
    }

    let user = dados.contatos['whats-users'].find(profile => profile.number == number)
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
        enviado_por:"",
        recebido_por:"",    
        mensagens: []
    }

    let senderContact = dados.contatos['whats-users'].find(senderProfile => senderProfile.number === senderNumber)
    let reciverContact = senderContact['contacts'].find(reciverProfile => reciverProfile.number === reciverNumber)
    
    message.mensagens.push(reciverContact)
    message.enviado_por = senderContact.account
    message.recebido_por = reciverContact.name
    console.log(message)
}

// função que faz a filtragem utilizando uma palavra chave na conversa entre usuarios
// const getMessageByKeyWord

//
// getAllUsers()
// getSpecifcProfileByNumber('11955577796')
// getAllContactsByNumber('11966578996')
// getAllMessagesByNumber('11966578996')
// getMessageWithAUserByNumber('11966578996', '26999999913')

module.exports={
    getAllUsers,
    getSpecifcProfileByNumber,
    getAllContactsByNumber,
    getAllMessagesByNumber,
    getMessageWithAUserByNumber
}