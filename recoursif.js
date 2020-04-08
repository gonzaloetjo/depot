function fib(n){ 
    console.log("A la fonction est a " + n)
    if (n <= 1) {
        console.log("B la fonction est a " + n)
        return 1
    }
    else {
        return fib(n-1) + fib(n-2)
    }
}

fib(3)