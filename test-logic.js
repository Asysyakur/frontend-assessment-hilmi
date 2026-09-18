import {
  countCharacterFrequency,
  processUserData,
} from "./logic-assessment.js";

const frequency = countCharacterFrequency("Hello, World!");

const users = [
  { id: 1, name: "Alice", age: 25, gender: "female" },
  { id: 2, name: "Bob", age: 30, gender: "male" },
  { id: 3, name: "Charlie", age: 15, gender: "male" },
  { id: 4, name: "Diana", age: 28, gender: "female" },
  { id: 5, name: "Eve", age: 22, gender: "female" },
  { id: 6, name: "Frank", age: 20, gender: "male" },
  { id: 7, name: "Grace", age: 19, gender: "" },
  { id: 8, name: "Hank", age: 40, gender: null },
  { id: 9, name: "Ivy", age: "35", gender: "female" },
];

const result = processUserData(users);

console.log(frequency);
console.dir(result, { depth: null });