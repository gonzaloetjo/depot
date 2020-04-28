const blocReajustement = (hauteurBloc) => {
    return (hauteurBloc % 2016 === 0) ? true : false
    
};
console.log(blocReajustement(2017))