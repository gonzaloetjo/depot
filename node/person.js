class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
        console.log(__dirname, __filename, 5);
    }
    greeting() {
        console.log(`My name is ${this.name} and I am ${this.age}`);
    }
}

module.exports = Person;
console.log(__dirname, __filename);