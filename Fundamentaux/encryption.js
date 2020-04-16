const crypto = require('crypto')
const prompt = require('prompt-sync')({sigint: true});

let message = prompt("Send a message: ");


let bmessage = Buffer.from(message)
//let key = Buffer.from(crypto.randomBytes(message.length))
let key = Buffer.from('ola')

function crpyting(bmessage, key){
    let encryption = []
    for (let i = 0; i < bmessage.length; i++) {
        encryption.push(bmessage[i] ^ key[i])
    }
    return encryption
}

function decryption(key, encryption){
    let omessage = []
    for (let i = 0; i < key.length; i++) {
        omessage.push(key[i] ^ encryption[i])
    }

    let final_message = ''
    for (let i = 0; i < key.length; i++) {
        final_message += String.fromCharCode(omessage[i])       
    }
    return final_message
}

console.log(`The message is \'${message}\'. The encryption is ${crpyting(bmessage, key)}`)
console.log(`The key is \'${crpyting(bmessage, key)}\'. Thus the message is ${decryption(key, crpyting(bmessage, key))} `)
// console.log(letter, key)
// console.log(letter ^ key)

// let messageCrypted = Buffer.from([letter[0] ^ key[0]])
// console.log("crypted message", messageCrypted)
// console.log("Uncrypted message", String.fromCharCode(key[0] ^ messageCrypted[0]))