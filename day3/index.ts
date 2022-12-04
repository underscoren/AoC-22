import { readFile } from "fs/promises";

// mapping letters in alphabet to their priority values
const alphabetMap: {[key: string]: number} = [..."abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"]
    .reduce((map, char, i) => {
        map[char] = i+1;
        return map;
    }, {});

// read input and split into lines
const inputLines = (await readFile("input.txt"))
    .toString("utf-8")
    .trim()
    .split("\n")

const sum = (a,b) => a + b;

const totalPriorities = inputLines 
    .map(line => [ // split lines into two halves
        line.slice(0, Math.floor(line.length/2)), 
        line.slice(Math.floor(line.length/2))
    ])
    .map(([first, second]) => { // find the same character between the two
        for(const char of first) {
            if(second.includes(char))
                return char;
        }
    })
    .map(char => alphabetMap[char]) // get priroty value from map
    .reduce(sum); // sum up all the priorities

const totalBadgePriorities = inputLines
    .reduce((arr: string[][], line, i) => { // group lines into groups of 3
        const group = Math.floor(i / 3);
        
        if(i%3 == 0)
            arr[group] = [];
        
        arr[group].push(line);
        return arr;
    }, [])
    .map(([first, second, third]) => { // find duplicate in all three
        for(const char of first) {
            if(second.includes(char) && third.includes(char))
                return char;
        }

        throw new Error(`No duplicate in ${first} ${second} ${third}`);
    })
    .map(char => alphabetMap[char]) // get priority value
    .reduce(sum); // add them all up

console.log("total priorities:", totalPriorities);
console.log("total badge priorities:", totalBadgePriorities);