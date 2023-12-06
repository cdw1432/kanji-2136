import {jsonData} from './src/data-2136.js';

/* Global */
let selectedMenu: number = -1;
let jsonDataUpdated = jsonData;
let mainContent = document.getElementById('main')
/* MENU BUTTON */
const menuButton = document.getElementById('menu-button');
if (menuButton) {
  menuButton.addEventListener('click', () => {
    location.reload();
  });
}

/* MENU */
enum OPTIONS {
  ALL = 0,
  G1 = 1,
  G2 = 2,
  G3 = 3,
  G4 = 4,
  G5 = 5,
  G6 = 6,
  M = 7
}
const optionArray = Object.keys(OPTIONS).filter(key => !isNaN(Number((OPTIONS as any)[key])));
const menuElement = document.getElementById('menu');

optionArray.forEach((opt) => {
  const optionElement = document.createElement('li');
  const buttonElement = document.createElement('button');

  buttonElement.textContent = opt;

  buttonElement.addEventListener('click', () => {
    selectedMenu = (OPTIONS as any)[opt].toString();

    updateData();
    flashcards();
  });

  optionElement.appendChild(buttonElement);

  if (menuElement) {
    menuElement.appendChild(optionElement);
  }
});
let updateData = () => {
  const grade:string = (selectedMenu == 7) ? 'S' : selectedMenu.toString();
  if(grade != "0")
    jsonDataUpdated = jsonData.filter((e) => e.Grade == grade)
  else
    jsonDataUpdated = jsonData;

  //console.log(jsonDataUpdated);
}
/* KANJI */
interface Character {
  "New (Shinjitai)": string,
  "English meaning": string,
  "Readings": string,
}
class Card {
  character: string;
  reading: string;
  meaning: string;

  umdok: string[] = [];
  hundok: string[] = [];

  constructor(c: string, r: string, m:string) {
    this.character = c;
    this.reading = r;
    this.meaning = m;
    this.ModifyMeaning();
  }
  ModifyMeaning() {
    let arr = this.reading.slice(0, this.reading.indexOf('\n')).split('、').map((str) => str.replace(/[\uFF08\uFF09()]/g, "")); //remove "（" and "）"
    
    function isKatakana(str: string): boolean {
      return /^[\u30A0-\u30FF]+$/.test(str); 
    }
    
    this.umdok = arr.filter(str => isKatakana(str.replace(/[\uFF08(].*?[\uFF09)]/g, "")));
    this.umdok = this.umdok.map((str) => this.KataToHira(str));
    this.hundok = arr.filter(str => !isKatakana(str.replace(/[\uFF08(].*?[\uFF09)]/g, "")));
  }
  
  KataToHira(input: string): string {
    return input.replace(/[\u30A1-\u30F6]/g, function(match) {
      const charCode = match.charCodeAt(0) - 0x60;
      return String.fromCharCode(charCode);
    });
  }
  ShowInConsole() {
    console.log(this.character);
    console.log(this.meaning);
    console.log(this.umdok);
    console.log(this.hundok);
  }
}

function flashcards() {
  const left = document.getElementById('left-arrow')
  const right = document.getElementById('right-arrow')
  if (menuElement && left && right) {
    menuElement.style.display = "none";
    left.style.display = "contents";
    right.style.display = "contents";
    left.addEventListener('click', () => {
      showChar();
    });
    right.addEventListener('click', () => {
      showChar();
    });
  }
  showChar();
}
let showChar = () => {
  const rChar:Character = jsonDataUpdated[Math.floor(Math.random() * jsonDataUpdated.length)]
  let card = new Card(rChar["New (Shinjitai)"], rChar["Readings"], rChar["English meaning"])
  const container = mainContent?.querySelector(`#container`);
  if(container) {
    const charElement = document.createElement('h2');
    const umdokElement = document.createElement('ul');
    const hundokElement = document.createElement('ul');
    charElement.textContent = card.character
    charElement.id = "character"
  
  card.umdok.forEach((v,i) => {
      const list = document.createElement('li')
      list.textContent = v;
      list.className = `umdok umdok-${i}`;
      umdokElement.appendChild(list);
  })
  card.hundok.forEach((v,i) => {
    const list = document.createElement('li')
    list.textContent = v;
    list.className = `hundok hundok-${i}`;
    hundokElement.appendChild(list);
  })
    container.innerHTML = '';
    container.appendChild(charElement);
    container.appendChild(umdokElement);
    container.appendChild(hundokElement);
  }
  card.ShowInConsole();
}