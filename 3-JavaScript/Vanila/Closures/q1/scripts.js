function createMultiplier(multiplier) {
	function multiplyBy(number) {
		return number * multiplier;
	}
	return multiplyBy;
}

let multiplyBy4 = createMultiplier(4);
let multiplyBy10 = createMultiplier(10);
let multiplyBy32 = createMultiplier(32);
console.log(multiplyBy4(2));
console.log(multiplyBy4(3));
console.log(multiplyBy4(4));
console.log(multiplyBy10(2));
console.log(multiplyBy10(3));
console.log(multiplyBy10(4));
console.log(multiplyBy32(2));
console.log(multiplyBy32(3));
console.log(multiplyBy32(4));