const blockRea = (hauteurBloc) => {
    n = Math.floor(hauteurBloc / 210000)
    return n !== 0 ? Math.floor(50 / (2**n)*100000000)/100000000 : 50 
};

let h = 0, sum = 0
function bitcoinsEnCirculation(hauteurBloc) {
    let n = Math.floor(hauteurBloc / 210000)

    for (let i = 0; i < n+1; i++) {
        console.log(i)
        if (i === 0 ) {sum += 50}
        else { 
            if (i !== n+1) {
                sum += blockRea(i)*210000
            } else { 
            sum += blockRea(i-1)*(hauteurBloc%210000)
            }
        }
    }
    sum = sum
    return sum
}
console.log(bitcoinsEnCirculation(0))
console.log(bitcoinsEnCirculation(210000))
console.log(bitcoinsEnCirculation((210000*2)))
console.log(bitcoinsEnCirculation(2100001))