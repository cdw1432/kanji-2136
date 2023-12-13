function shakeElement(ele :HTMLElement): void {
    ele.classList.add('shake');

    setTimeout(() => {
        ele.classList.remove('shake');
    }, 500);
}

function popUpElement(ele :HTMLElement): void {
    ele.classList.add('appear');

    setTimeout(() => {
        ele.classList.remove('appear');
    }, 500);
}
/* TEST */
const element = document.getElementById('element') as HTMLElement;
const button = document.getElementById('aniButton') as HTMLButtonElement;
/* 
            <div id="element" style="width: 100px; height: 100px; background-color: #ccc; margin: 50px;"></div>
            <button id="aniButton"></button>  
*/
if (element && button) {
    button.addEventListener('click', () => {
    /* Test function */
        popUpElement(element);
  }); 
}