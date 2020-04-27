const value = "0x911d07"


changer = function(rest){
    switch(rest) {
        case "a": rest = 10
            break
        case "b": rest = 11 
            break
        case "c": rest = 12  
            break 
        case "d": rest = 13 
            break   
        case "e": rest = 14
            break       
        case "f": rest = 15  
            break
        case "x": rest = "0"
             break
    }
    return rest
}

var array = value.split(""), final_array = [], h = 0, integer = 0
array = array.map(x => changer(x) )
console.log(array)
array = array.map(x => parseInt(x) )
console.log(array)

//array = array.map((x) => x!==0 ? final_array.push[x] : x )
//array = array.reverse()
console.log(array)



for (let i = 0; i < array.length; i++) {
    if (array[i]===0) {
        h += 1
    } else {
        break;
    }
}

console.log(h)
array.splice(0,h) 
array = array.reverse()
console.log(array)
for (let i = 0; i < array.length; i++) {
    if (i % 2 === 0){
    integer += array[i+1]*16**(array.length - (i+1))    
    integer += array[i]*16**(array.length - (i+2))    
    console.log(integer, array[i+1],array.length - (i+1))
    console.log(integer, array[i],array.length - (i+2))

    }
}

console.log(array)
console.log(integer)
console.log(integer - 466321)

//console.log(final_array)
