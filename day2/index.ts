import { readFile } from "fs/promises";

type Opponent = "A"|"B"|"C";
type Player = "X"|"Y"|"Z";
const opponentPicks: Opponent[] = ["A", "B", "C"];
const playerResponses: Player[] = ["X", "Y", "Z"];

// map each value in grid to  "<opponent> <player>" -> score  format
const makeMap = (map: {}, row: number[], i: number) => {
    row.forEach((score, j) => {
        map[`${opponentPicks[j]} ${playerResponses[i]}`] = score;
    });

    return map;
}

// part 1

const scoreMap = [
   //  R  P  S (opponent)
/*R*/ [1, 0, 2],
/*P*/ [2, 1, 0],
/*S*/ [0, 2, 1],
/*(player)*/
]
    .map(row => row.map(value => value * 3)) // convert outcome to points won
    .map((row, i) => row.map(points => points + i + 1)) // add shape points to calculate final score
    .reduce(makeMap, {}); // map all possibilities to scores

// part 2

const correctScoreMap = ([
   //  R    P    S (opponent)
/*L*/["Z", "X", "Y"],            /*  Instead of representing outcome, these are now  */
/*D*/["X", "Y", "Z"],            /*  shapes. For example, if the opponent chooses    */
/*W*/["Y", "Z", "X"],            /*  Rock and we lose, we must have chosen Scissors  */
/*(outcome)*/
] as Player[][]) /* (thank you typescript, very cool) */
    .map(row => row.map(pick => playerResponses.indexOf(pick) + 1)) // map choices to shape points
    .map((row, i) => row.map(points => points + i * 3)) // add points won to calculate final score
    .reduce(makeMap, {}); // map all possibilities to scores



// read file and split into lines
const inputLines = (await readFile("input.txt")) 
    .toString("utf-8")
    .trim()
    .split("\n");


const sum = (a,b) => a + b;
console.log("Total score:", inputLines
    .map(line => scoreMap[line]) // get precomputed score for each line
    .reduce(sum) // add up all the scores
);

console.log("Total (correct) score:", inputLines
    .map(line => correctScoreMap[line]) // get precomputed score for each line
    .reduce(sum) // add up all the scores
);