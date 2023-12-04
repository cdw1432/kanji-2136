import {jsonData} from './src/data-2136.js';

let selectedMenu: number = -1;
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
    updateData()
  });

  optionElement.appendChild(buttonElement);

  if (menuElement) {
    menuElement.appendChild(optionElement);
  }
});
let updateData = () => {
  const grade:string = (selectedMenu == 7) ? 'S' : selectedMenu.toString();
  if(grade != "0")
    console.log(jsonData.filter((e) => e.Grade == grade))
  else
    console.log(jsonData)

}



// interface Character {
//   "New (Shinjitai)": string;
// }

// const firstChar: Character = jsonData[0];
// const lastChar: Character = jsonData[2136 - 1];

// let kanji = document.getElementById('kanji');
// if (kanji) {
//   kanji.innerHTML += `<h1>` + firstChar["New (Shinjitai)"]; + `</h1>`
//   kanji.innerHTML += `<h1>` + lastChar["New (Shinjitai)"]; + `</h1>`
// }

// console.log(firstChar);
// console.log(lastChar);

//right arrow
//<svg xmlns="http://www.w3.org/2000/svg" height="16" width="10" viewBox="0 0 320 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path fill="#000000" d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"/></svg>
//left arrow
//<svg xmlns="http://www.w3.org/2000/svg" height="16" width="10" viewBox="0 0 320 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path fill="#000000" d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"/></svg>