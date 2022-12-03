import { readFile } from "fs/promises";

// defining a basic addition arrow function
const sum = (a,b) => a + b;

const calorieList = (await readFile("input.txt")) // read file 
    .toString("utf-8") // convert to string
    .split("\n") // split into lines
    .map(l => parseInt(l)) // convert lines to numbers (empty line is NaN)
    .reduce((arr, current) => { // group full lines into arrays (now we have an array of arrays)
        if(isNaN(current)) {
            arr.push([]);
            return arr;
        }
            
        arr[arr.length-1].push(current)
        return arr;
    }, [[]])
    .map(arr => arr.reduce(sum, 0)) // add up each inner array
    .sort((a,b) => b-a); // sort array in descending order

console.log("most calories: ", calorieList[0]);
console.log("top 3: ", calorieList
    .slice(0,3) // get top 3
    .reduce(sum) // add them up
);

