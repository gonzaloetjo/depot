function pseudohash(str) {
    let hash = 0 
    for (let i = 0; i < str.length-1; i++) {
        hash = (hash + 1) *(str.charCodeAt(i))
    }
    console.log(hash)
    return hash % (256*256)
}

console.log(pseudohash("Bonjour"))
console.log(pseudohash("Bonjour."))
console.log(pseudohash("Bonjoru"))
console.log(pseudohash("Bonjour"))
