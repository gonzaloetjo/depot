const blocReajustement = (hauteurBloc) => {
    n = Math.floor(hauteurBloc / 210000)
    return n != 0 ? Math.floor(50 / (2**n)*100000000)/100000000 : 50 
};
console.log(blocReajustement(0))
console.log(blocReajustement(210000))
console.log(blocReajustement((210000*2)+1))
console.log(blocReajustement(2100001))
