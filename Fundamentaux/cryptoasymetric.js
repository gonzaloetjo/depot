const crypto = require('crypto')

const {privateKey, publicKey} = crypto.generateKeyPairSync('ec', {namedCurve:'secp256k1'})
console.log(privateKey,publicKey)