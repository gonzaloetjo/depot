const blocReajustement = (hauteurBloc) => {
    n = Math.floor(hauteurBloc / 210000)
    return n != 0 ? Math.floor(50 / (2**n)*100000000)/100000000 : 50 
};
console.log(blocReajustement(0))
console.log(blocReajustement(200000))
console.log(blocReajustement(627813))
console.log(blocReajustement(2000000))
