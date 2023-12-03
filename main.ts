import {jsonData} from './src/data-2136.js';

interface Character {
  "New (Shinjitai)": string;
}

const firstChar: Character = jsonData[0];
const lastChar: Character = jsonData[2136 - 1];

let kanji = document.getElementById('kanji');
if (kanji) {
  kanji.innerHTML += `<h1>` + firstChar["New (Shinjitai)"]; + `</h1>`
  kanji.innerHTML += `<h1>` + lastChar["New (Shinjitai)"]; + `</h1>`
}

console.log(firstChar);
console.log(lastChar);