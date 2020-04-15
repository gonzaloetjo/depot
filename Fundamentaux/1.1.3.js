
function estPalindrome(mot){
    r = false
    mot = mot.replace(/\s/g, '');
    if (mot.length > 1 && mot.length%2 == 0){
        for (i = 0; i <= (mot.length-1) / 2; i++) {
            if (mot[i] == mot[mot.length-(i+1)]){
                r = true
            }
            else {
                r = false
            }
        }
        return r
    }
    else if (mot.length > 1 && mot.length%2 != 0) {
        for (i = 0; i+1 < (mot.length/2); i++) {
            console.log(i)
            //console.log((((mot.length -1) / 2)-1))
            console.log(mot[i])
            console.log(mot[mot.length-(i+1)])
            if (mot[i] == mot[mot.length-(i+1)]){
                r = true
            }
            else {
                r = false
            }
        }
        return r
    }
    else {
        return true
    }
}



console.log("\t", estPalindrome(""))
console.log("A\t", estPalindrome("A"))
console.log("AB\t", estPalindrome("AB"))
console.log("AA\t", estPalindrome("AA"))
console.log("ABA\t", estPalindrome("ABA"))
console.log("ANNA\t", estPalindrome("ANNA"))
console.log("ANKA\t", estPalindrome("ANKA"))
console.log("RADAR\t", estPalindrome("RADAR"))
console.log("ESOPE RESTE ICI ET SE REPOSE\t", estPalindrome("ESOPE RESTE ICI ET SE REPOSE"));



