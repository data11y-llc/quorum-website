//start a file to store the accessibility functions
import { letterButtonType } from "./Types.js";
import { readCharacters, readInstructions, readWords } from './ReadSentence.js';
import { letterActions } from './LetterActions.js';

export function rowOnKeydown(div: HTMLDivElement) {
  div.addEventListener('keydown', event => {
    if (!['Tab', 'Enter', 'Escape', 'ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    //if focused within but not on lockedRow
    if (event.target !== div && event.target !== div.parentElement) {
      if (event.key === 'Tab') {
        event.preventDefault();
        if (event.shiftKey) {
          navigateLetters('left');
        } else {
          navigateLetters('right');
        }
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        navigateLetters('left');
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        navigateLetters('right');
      }
      if (event.key === 'Escape') {
        div.focus();
        const outerRow = event.currentTarget as HTMLElement;
        outerRow.querySelectorAll('button').forEach(element => (element.tabIndex = -1));
      }
    } else {
      if (event.key === 'Enter') {
        event.preventDefault();
        const lockedRow = document.getElementById('lockedRow') as HTMLDivElement;
        lockedRow.querySelector('button')?.focus();
        //make all locked letters focusable
        const lockedLetters = lockedRow.querySelectorAll('button') as NodeListOf<letterButtonType>;
        lockedLetters.forEach(letter => letter.tabIndex = 0);
      }
    }
  });
}


export function globalKeyboardEvents(cipherLoader: HTMLDivElement) {
  cipherLoader.addEventListener("keydown", event => {
    switch (event.key) {
      case 'r': readWords(); break;
      case 'R': readCharacters(); break;
      case 'I': readInstructions(); break;
      // case 'ArrowLeft': rewind(); break;
      // case 'ArrowRight': fastForward(); break;
      case 'M': CipherAria.readAllMarked(); break;
    }
  });
}

export function letterEvents(letter: letterButtonType) {
  letter.onclick = () => letterActions.markLetter(letter);
  letter.addEventListener('keydown', event => {
    switch (event.key) {
      case 's': letterActions.swapLetters(); break;
      case 'm': letterActions.lockLetters(); break;
    }
  });
}

export function sendMessageToAriaReader(message: string, assertiveness: 'polite' | 'assertive' = 'polite') {
  const ariaReader = document.getElementById('CipherAriaLive') as HTMLDivElement;
  ariaReader.setAttribute('aria-live', assertiveness);
  ariaReader.innerHTML = message;
}
export namespace CipherAria {
  export function readLetters(): void {
    const currentLetter = document.activeElement as letterButtonType;
    const ariaLive = document.getElementById('CipherAriaLive') as HTMLDivElement;
    let letterOG: string;
    let letterUnlocked: letterButtonType;
    let innerText: string;

    if (currentLetter.dataset.row === 'locked') {
      letterOG = currentLetter.id[currentLetter.id.length - 1];
      letterUnlocked = document.getElementById('unlocked-letter-' + letterOG) as letterButtonType;
      innerText = `
    "${currentLetter.dataset.currentLetter != '' ? currentLetter.dataset.currentLetter : 'nothing'}" is mapped to "${currentLetter.dataset.letterOG}"
    `;
      ariaLive.innerText = innerText;
    }
  }

  export function readSwapped(firstSwapped: letterButtonType, secondSwapped: letterButtonType): void {
    //get firstSwapped row and currentLetter
    let first = { row: firstSwapped.dataset.row, letter: firstSwapped.dataset.currentLetter ? firstSwapped.dataset.currentLetter : 'blank', og: firstSwapped.dataset.letterOG };
    let second = { row: secondSwapped.dataset.row, letter: secondSwapped.dataset.currentLetter ? secondSwapped.dataset.currentLetter : 'blank', og: secondSwapped.dataset.letterOG };

    const ariaLive = document.getElementById('CipherAriaLive') as HTMLDivElement;
    ariaLive.innerText = `"${first.letter}" now mapped to "${first.og}",
    "${second.letter}" now mapped to "${second.og}"`;
  }

  export function readMarked(letter: letterButtonType) {
    const ariaLive = document.getElementById('CipherAriaLive') as HTMLDivElement;
    ariaLive.setAttribute('aria-live', 'assertive');
    ariaLive.innerText = `
    ${letter.dataset.currentLetter ? `"${letter.dataset.currentLetter}"`
        : `selected blank letter, the original letter ${letter.dataset.letterOG}`}
    is ${letter.dataset.marked === 'true' ? 'selected' : 'unselected'}, 
    press 'm' to ${letter.dataset.currentLetter ? `unmap letter` : `remap original letter to ${letter.dataset.letterOG}`}`;
  }

  export function readAllMarked() {
    const ariaLive = document.getElementById('CipherAriaLive') as HTMLDivElement;
    const markedLetters = document.querySelectorAll('[data-marked="true"]') as NodeListOf<letterButtonType>;
    const markedLettersArray = Array.from(markedLetters);
    const markedLettersText = markedLettersArray.map(letter => letter.dataset.currentLetter ? letter.dataset.currentLetter : 'blank');
    ariaLive.innerText = `marked letters are ${markedLettersText}`;
  }
}

/**
  * goToLetter will move left or right depending on the direction
  */


export function navigateLetters(direction: 'left' | 'right') {
  const currentLetter = document.activeElement as letterButtonType;
  const nextLetter = direction === 'right' ? currentLetter.nextElementSibling as letterButtonType : currentLetter.previousElementSibling as letterButtonType;
  if (nextLetter && nextLetter.id.startsWith('locked')) {
    nextLetter.focus();
    CipherAria.readLetters();
  }
}
