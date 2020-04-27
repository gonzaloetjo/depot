function convertDecitoHexa(d){
    hexa = d.toString(16)
    if (hexa.length % 2 == 1){
        hexa = '0' + hexa
    }
    return hexa
}


console.log(convertDecitoHexa(466321))