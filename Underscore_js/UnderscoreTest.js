var derp = (function() {

	// variables
	var peopleArray = ["tom", "dick", "harry"];
	var personObject = {name: "tom", age: 21, gender: "male"};
	var numbers = [1, 2, 3];

	// foreach function
	_.each(peopleArray, function(value, key) {
		console.log(key + ": " + value);
	});

	_.each(personObject, function(value, key) {
		console.log(key + ": " + value);
	});

	// map funtion
	var numbersMultiplied = _.map(numbers, function(value, key, items) {
		items[key] = items[key] * 2;
		return value * 3;
	});
	console.log(numbers);
	console.log(numbersMultiplied);

	// Reduce and reduce right functions - Sums all values into total
	var numbers = [1, 2, 3];
	var sum = _.reduce(numbers, function(total, value, key, items) {
		return total + value;
	});
	console.log(sum);
	// Reduce right will iterate from right to left
	var sum = _.reduceRight(numbers, function(total, value, key, items) {
		return total + value;
	});
	console.log(sum);

	// Find function - return first value it finds that matches the algorithm in the predicate function
	var numbers = [1, 2, 3, 4, 5, 6];
	var numFound = _.find(numbers, function(value) {
		return value % 3 == 0;
	});
	console.log(numFound);

	// Filter function - return all values that match the algorithm in the predicate function as a list
	var numbers = [1, 2, 3, 4, 5, 6];
	var numsFound = _.filter(numbers, function(value) {
		return value % 3 == 0;
	});
	console.log(numsFound);

	// Where function - return all values in a list using a where clause
	var people = [
		{name: "Tom", age: 21},
		{name: "Dick", age: 30},
		{name: "Harry", age: 21}
	];
	var found = _.where(people, {age: 21});
	console.log(found);

	// Find Where function - return the first value in a list using a where clause
	var people = [
		{name: "Tom", age: 21},
		{name: "Dick", age: 30},
		{name: "Harry", age: 21}
	];
	var found = _.findWhere(people, {age: 21});
	console.log(found);

	// Reject function - reduce a list based on an algorithm
	var oddNumbers = _.reject(numbers, function(value) {
		return value % 2 == 0;
	});
	console.log(oddNumbers);

	// Every function - make sure every value in a list matches an algorithm
	var isMatch = _.every(numbers, function(value) {
		return value > 0;
	});
	console.log(isMatch);

	// Some function - make sure at least one value in a list matches an algorithm
	var isOneMatch = _.some(numbers, function(value) {
		return value == 6;
	});
	console.log(isOneMatch);

	// Contains function - make sure at least one value in a list matches a value passed in
	var isOneMatch = _.contains(numbers, 7);
	console.log(isOneMatch);

	// Invoke function - take a list and run a function on each iteration
	function multiply(multiplier, extraMultiplier) {
		return this * multiplier * extraMultiplier;
	}
	var result = _.invoke(numbers, multiply, 2, 4);
	console.log(result);

	// Pluck function - extract info from each object based on a property
	var name = _.pluck(people, "name");
	console.log(name);


	// Max function - return the maximum value from a list
	var maxNum = _.max(numbers);
	var maxAge = _.max(people, function(person) {
		return person.age;
	});
	console.log(maxNum);
	console.log(maxAge);

	// Min function - return the minimum value from a list
	var maxNum = _.min(numbers);
	var maxAge = _.min(people, function(person) {
		return person.age;
	});
	console.log(maxNum);
	console.log(maxAge);

	// Sort By function - sorts values in a list
	var cars = ["Toyota", "Kia", "Ford", "Chev"];
	var sortedAlpha = _.sortBy(cars);
	var sortedLength = _.sortBy(cars, function(car) {
		return car.length;
	});
	var sortedAge = _.sortBy(people, function(person) {
		return person.age;
	});
	console.log(sortedAlpha);
	console.log(sortedLength);
	console.log(sortedAge);

	// Group By function - groups a list into sets
	var groupedCars = _.groupBy(cars, "length");
	var groupPeople = _.groupBy(people, function(person) {
		return person.age;
	});
	console.log(groupedCars);
	console.log(groupPeople);

	// Index By function - give each item in a list an index based on what you define
	var people = [
		{name: "Tom", age: 21},
		{name: "Dick", age: 30},
		{name: "Harry", age: 25}
	];
	var indexed = _.indexBy(people, "age");
	console.log(indexed);

	// Count By function - sorts a list into groups and returns a count for the num objects in each group
	var counts = _.countBy(numbers, function(num) {
		return num % 2 == 0 ? "even" : "odd";
	});
	console.log(counts);

	// Shuffle function - shuffles a list into random order
	var shuffled = _.shuffle(numbers);
	console.log(shuffled);

	// Sample function - return one or a specified amount of values randomly from a passed in list
	var sampledOne = _.sample(numbers);
	var sampledMany = _.sample(numbers, 3);
	console.log(sampledOne);
	console.log(sampledMany);

	// To Array function - Makes a list from a set of values or a copy of another list
	(function() {
		var arr = _.toArray(arguments).slice(1);	
		console.log(arr);	
	}("Tom", "Dick", "Harry"));
	var arr2 = _.toArray(cars);
	console.log(arr2);	

	// Size function - returns the amount of values in a list
	var count = _.size(numbers);
	console.log(count);

	// Partition function - split a list into two different parts. First part is the values that satisfy the predicate function and the other part is the values that do not
	var partitioned = _.partition(people, function(person) {
		return person.name.length > 3;
	});
	console.log(partitioned);

	// First function - returns the first value in an array or a specified amount passed in
	var first = _.first(numbers);
	var firstThree = _.first(numbers, 3);
	console.log(first);
	console.log(firstThree);

	// Initial function - Returns an array that excludes one or a specified amount of values from an array passed in
	var removeLast = _.initial(numbers);
	var removeMany = _.initial(numbers, 3);
	console.log(removeLast);
	console.log(removeMany);

	// Last function - returns the last value in an array or a specified amount passed in
	var last = _.last(numbers);
	var lastThree = _.last(numbers, 3);
	console.log(last);
	console.log(lastThree);

	// Rest function - return the rest of the values from an array from a certain point
	var restNums = _.rest(numbers);
	var restNumsCustom = _.rest(numbers, 3);
	console.log(restNums);
	console.log(restNumsCustom);

	// Compact function - return an array that has removed all values that are considered false
	var things = [1, 0, 2, '', false, "Derp"];
	var falseThings = _.compact(things);
	console.log(falseThings);

	// Flatten funtion - flattens out a nested array into one array. If true is passed in it will only flatten down one level
	var nested = [1, 2, [3], [[4]]];
	var flattenedAll = _.flatten(nested); 
	var flattenedOne = _.flatten(nested, true); 
	console.log(flattenedAll);
	console.log(flattenedOne);

	// Without function - Return a list where values you have specified are excluded
	var excluded = _.without(numbers, 2);
	var excludedMany = _.without(numbers, 2, 4, 5);
	console.log(excluded);
	console.log(excludedMany);

	// Union function - merge two or more arrays/objects into one. It will only include one of a duplicate value
	var union = _.union(numbers, people);
	console.log(union);

	// Intersection function - merge two or more arrays/objects into one but only take the values that are duplicates in the arrays
	var arr1 = [1, 2, 3, 4, 5];
	var arr2 = [0, 7, 3, 7, 5];
	var intersected = _.intersection(arr1, arr2);
	console.log(intersected);

	// Difference function - returns the values from the first array that dont exist in the subsequent arrays
	var different = _.difference(arr1, arr2);
	console.log(different);

	// Uniq function - removes duplicates from an array. Always keeps the first unique value it encounters
	var people = [
		{name: "Tom", age: 21},
		{name: "Dick", age: 30},
		{name: "Harry", age: 21}
	];
	var unique = _.uniq(arr2);
	var uniquePeople = _.uniq(people, false, function(person) {
		return person.age;
	});
	console.log(unique);
	console.log(uniquePeople);

}());