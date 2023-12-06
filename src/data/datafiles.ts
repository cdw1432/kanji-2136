/* I didn't include these json files in my git repo */
import {koreanData} from './korean.js';
import {englishData} from './english.js';

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