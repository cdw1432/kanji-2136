import { database } from './src/data/database.js';
/* Global */
let selectedMenu: number = -1;
let databaseUpdated = database;
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

optionArray.forEach((opt,idx) => {
  const optionElement = document.createElement('li');
  const buttonElement = document.createElement('button');
  buttonElement.className = `appear delay-${idx+1}`
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
    databaseUpdated = database.filter((e) => e.grade == grade)
  else
    databaseUpdated = database;

  //console.log(jsonDataUpdated);
}
/* KANJI */
interface KanjiObj {
  "character": string;
  "grade": string;
  "meaningKR": string;
  "meaningEN": string;
  "umdok": string | null;
  "hundok": string | null;
}
class Card {
  character: string;
  grade: string;
  meaningKR: string;
  meaningEN: string;
  onyomi: string | null;
  kunyomi: string | null;
  
  constructor(c: string,
              g:string, 
              mkr:string, 
              men:string, 
              u:string | null, 
              h:string | null) {
    
    this.character = c;
    this.grade = g;
    this.meaningKR = mkr;
    this.meaningEN = men;
    this.onyomi = u;
    this.kunyomi = h;
  }
  GetOnyomi():string[] {
    if(this.onyomi)
      return this.onyomi?.split('、')

    return [];
  }
  GetKunyomi():string[] {
    if(this.kunyomi)
      return this.kunyomi?.split('、')
    return [];
  }
  IsKatakana(str: string): boolean {
    return /^[\u30A0-\u30FF]+$/.test(str); 
  }
  KataToHira(input: string): string {
    return input.replace(/[\u30A1-\u30F6]/g, function(match) {
      const charCode = match.charCodeAt(0) - 0x60;
      return String.fromCharCode(charCode);
    });
  }
  ShowInConsole() {
    console.log(this.character);
    console.log(this.grade);
    console.log(this.meaningKR);
    console.log(this.meaningEN);
    console.log(this.onyomi);
    console.log(this.kunyomi);
  }
}

function flashcards() {
  const left = document.getElementById('left-arrow')
  const right = document.getElementById('right-arrow')
  let count:number = 0;
  if (menuElement && left && right) {
    menuElement.style.display = "none";
    left.style.display = "contents";
    right.style.display = "contents";
    left.addEventListener('click', () => {
      count--;
      if(count == -1)
        count = databaseUpdated.length-1;

      showChar(count);
    });
    right.addEventListener('click', () => {
      count++;
      if(count == databaseUpdated.length)
        count = 0;
      showChar(count);
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowRight') {
        count++;
        if(count == databaseUpdated.length)
          count = 0;
        showChar(count);
      } else if(event.key == 'ArrowLeft') {
        count--;
        if(count == -1)
          count = databaseUpdated.length-1;
  
        showChar(count);
      }
    });
  }
  showChar(count);
}
let showChar = (count:number) => {
  //const rChar:KanjiObj = databaseUpdated[Math.floor(Math.random() * databaseUpdated.length)]
  const rChar = databaseUpdated[count]
  console.log(count, rChar.character);
  let lengthBar = document.getElementById('length-bar');
  if(lengthBar)
    lengthBar.textContent = count+1 + '/' + databaseUpdated.length;

  let card = new Card(rChar.character, rChar.grade,rChar.meaningKR,rChar.meaningEN, rChar.umdok, rChar.hundok)
  const container = mainContent?.querySelector(`#container`) as HTMLElement;;
  if (container) {
    container.style.display = 'grid';
  }
  if(container) {
    const charElement = document.createElement('h2');
    const meaningK = document.createElement('h3');
    const meaningE = document.createElement('h3');
    const umdokElement = document.createElement('ul');
    umdokElement.id = 'umdoklist'
    const hundokElement = document.createElement('ul');
    hundokElement.id = 'hundoklist'
    charElement.textContent = card.character

    meaningK.textContent = card.meaningKR
    meaningK.className = 'meaning kr'
    meaningE.textContent = card.meaningEN.toUpperCase();
    meaningE.className = 'meaning en'
  
  card.GetOnyomi().forEach((v,i) => {
      const list = document.createElement('li')
      list.textContent = v;
      list.className = `umdok umdok-${i}`;
      umdokElement.appendChild(list);
  })
  card.GetKunyomi().forEach((v,i) => {
    const list = document.createElement('li')
    list.textContent = v;
    list.className = `hundok hundok-${i}`;
    hundokElement.appendChild(list);
  })
    container.innerHTML = '';

    var divC = document.createElement('div');
    var divM = document.createElement('div');
    var divR = document.createElement('div');
    divC.id = "character"
    divM.id = "meaning"
    divR.id = "readings"
    
    divC.appendChild(charElement);
    divM.appendChild(meaningK);
    divM.appendChild(meaningE);

    divR.appendChild(umdokElement);
    divR.appendChild(hundokElement);
    
    container.appendChild(divC);
    container.appendChild(divM);
    container.appendChild(divR);
  }
  //card.ShowInConsole();
}