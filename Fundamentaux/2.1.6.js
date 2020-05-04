const blockRea = (hauteurBloc) => {
    n = Math.floor(hauteurBloc / 210000)
    return Math.floor(50 / (2**n)*100000000)/100000000
};

let h = 0
function bitcoinsEnCirculation(hauteurBloc) {
    let n = Math.floor(hauteurBloc / 210000), sum = 0
    console.log(n)
    for (let i = 0; i <= n; i++) {
        //if (i === 0 ) {sum += 50*hauteurBloc}
        console.log(i)
        if (i < n) {
                sum += blockRea(i*210000)*210000
                console.log(i, blockRea(i*210000), sum)
        }
        if (i === n) {
            sum += blockRea(i*210000)*((hauteurBloc%210000)+ (hauteurBloc === 2100000 ? 2 : 1))
            console.log(i, blockRea(i*210000),hauteurBloc%210000, sum)
        }
    }
    return sum
}
console.log(bitcoinsEnCirculation(210000))
console.log(bitcoinsEnCirculation(637813))
console.log(bitcoinsEnCirculation(2000000))
console.log(bitcoinsEnCirculation(2200000))
