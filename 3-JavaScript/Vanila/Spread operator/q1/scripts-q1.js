function multiplyFuor(a, b, c, d) {
    return a*b*c*d;
}
let fuorNumbers = [2, 3, 4, 5];
console.log(multiplyFuor(...fuorNumbers));

function concactTwo(vec1, vec2) {
    return [...vec1, ...vec2];
}
let firstName = [0,1,2,3,4];
let secondName = [5,6,7,8,9];
console.log(concactTwo(firstName, secondName));

function sortOneHundred() {
    let result = [];
    for(let i = 0; i < 10; i++){
        result.push(Math.floor(Math.random()*100 + 1));
    }
    return Math.max(...result);
}
console.log(sortOneHundred());