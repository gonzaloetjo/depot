// Utilisation du module crypto pour la cryptographie assymétrique
const crypto = require('crypto')
const prompt = require('prompt-sync')({sigint: true});
var signature = ""

//  const clesRSA = crypto.generateKeyPairSync('rsa', { modulusLength: 4096});
let key = {}
function keyGeneration() {
    const keyECC = crypto.generateKeyPairSync('ec', {namedCurve:'secp256k1'})
    key = keyECC
    return key
}

function signals(message,privateKey){
    const sign = crypto.createSign('SHA256');
    sign.write(message);
    sign.end();
    signature = sign.sign(privateKey, 'hex');
    return signature
}

function verifying(message,publicKey, signature){
    const verify = crypto.createVerify('SHA256');
    verify.write(message);
    verify.end();
    //console.log(verify.verify(publicKey, signature));
    return verify.verify(publicKey, signature, 'hex')
}

console.log(keyGeneration())
console.log(`your private key is ${key.publicKey}, the public key is ${key.publicKey}`)

let message = Buffer.from(prompt("writte a message "));
console.log(`your message signature is: [${signals(message,key.privateKey).substr(0,8)}..]`)

let verify_message = Buffer.from(prompt("writte a message to verify key: " ));
console.log(`The verification is:..`)

console.log(verifying(verify_message,key.publicKey, signature))


