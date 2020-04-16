const crypto = require('crypto')
const prompt = require('prompt-sync')({sigint: true});


let message = prompt("Send a message: ");


function codeVerification(message){
    let data = Buffer.from(message)
    let hash = crypto.createHash('sha256').update(data)
    let code = hash.digest('hex').substr(0,8)
    return code
}

function verifierCode(message,code){
    let data = Buffer.from(message)
    let hash = crypto.createHash('sha256').update(data)
    if (code === hash.digest('hex').substr(0,8)){
        return true
    }
    else {
        return false
    }
    
    
}

function vanite(debut, message){
    let nonce = 0

    return nonce
}
function verifierVanite(debut, message, nonce){
    
    
    return true
}


//let message = "Bonjour à tous"
let data = Buffer.from(message)
let hash = crypto.createHash('sha256').update(data)
console.log(`The message is \'${message}\'. The has is ${hash.digest('hex')}`)

let message_2 = prompt("Verify this message: ");
let code = codeVerification(message_2)
console.log(`Verification code is :\' ${code}\', validation : ${verifierCode(message,code)}`)

let debutHash = 'ab'
console.log(`A hash starting by \'${debutHash}\' peut être obtenu en ajoutant ${vanite(debutHash,message)} au message`)