/* I didn't include these json files in my git repo */
import {koreanData} from './korean.js';
import {englishData} from './english.js';
import * as fs from "fs";
import * as path from "path";

function MatchFiles() {
  let krmatched = true;
  let enmatched = true;
  for (const character of englishData) {
    const characterInfoFromSecondFile = koreanData.find((item: any) => item.character === character.character);
    if(characterInfoFromSecondFile == undefined) {
      console.log('englishData -> koreanData: unmatched : ' + character.character)
      krmatched = false;
    }
  }
  for (const character of koreanData) {
    const characterInfoFromSecondFile = englishData.find((item: any) => item.character === character.character);
    if(characterInfoFromSecondFile == undefined) {
      console.log('koreanData -> englishData: unmatched : ' + character.character)
      enmatched = false;
    }
  }
  if(krmatched && enmatched)
    console.log('matched')
  console.log('krData length: ' + koreanData.length)
  console.log('enData length: ' + englishData.length)
}
console.log("------------")
interface CharacterData {
  character: string;
}

function hasDuplicates(array: CharacterData[]): boolean {
  const values = new Set<string>();
  for (const item of array) {
    const value = item['character'];
    if (values.has(value)) {
      console.log('Error: ' + value);
      return true;
    }
    values.add(value);
  }
  return false;
}

function checkDuplicateCharacters() {
  const krData = hasDuplicates(koreanData);
  const enData = hasDuplicates(englishData)
  
  if (krData) {
    console.log(`Duplicates found in krData`);
  } else {
    console.log(`No duplicates found in krData`);
  }
  if (enData) {
    console.log(`Duplicates found in enData`);
  } else {
    console.log(`No duplicates found in enData`);
  }
}

MatchFiles();
checkDuplicateCharacters();

/* MAKE DATA FILE */
interface DATA {
  character: number;
  grade: string;
  meaningKR: string;
  meaningEN: string;
  umdok: string;
  hundok: string;
}

function mergeDataFiles(): DATA[] { 
  return koreanData.map((item1: any) => {
    const item2 = englishData.find((item2: any) => item2.character === item1.character);

    if (item2) {
      const mergedItem: DATA = {
        character: item1.character,
        grade: item2['Grade'],
        meaningKR: item1.meaning,
        meaningEN: item2['English meaning'],
        umdok: item1.umdok,
        hundok: item1.hundok,
      };
      return mergedItem;
    }
    return null;
  }).filter((item: DATA | null): item is DATA => item !== null);
}

const filePath = './src/data/database.ts';
let database:any;
function createDataFile() {
  const mergedData = mergeDataFiles();
  if(!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, `export const database = ${JSON.stringify(mergedData, null, 2)};\n`);
    console.log('database.ts created successfully.');
  } else  {
    console.log('database.ts exists')
    importDatabase();
  }
}

async function importDatabase() {
  const file = './database.js'
  try {
    if(!fs.existsSync(filePath)) {
      console.log(filePath,' does not exist');
      return;
    } else {
      const module = await import(file);
      database = module.database;
    }
    }
  catch (error) {
    console.log('Error from Importing ', error);
  }

//imported
  if(database) {
    console.log(database.length);
    console.log(database[0].character);
    console.log(database[0].umdok);
    console.log(database[0].hundok);
    console.log(database[0].grade);
  }
}

createDataFile();