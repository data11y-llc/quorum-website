/**
  * @fileoverview LetterActions - handles the letter control functions
  */
import { updateAll, updateSentence } from './UpdateAll.js';
import { CipherAria, sendMessageToAriaReader } from './Accessibility.js';
import { CSS, hoverStyle } from './Styles.js';
import { DivData, letterButtonType, letterDivType, letterType } from './Types.js';

export namespace dragAndDrop {
  export function allowDrop(ev: DragEvent) {
    ev.preventDefault();
  }
  export function drag(ev: DragEvent & HTMLElement) {
    if (ev.dataTransfer) {
      ev.dataTransfer.setData("id", (ev.target as HTMLElement).id);
    }
  }

  export function drop(ev: HTMLElement & DragEvent) {
    ev.preventDefault();
    console.log('drop');
    const data = ev.dataTransfer?.getData("id");
    console.log(data);
    if (!data) return

    const source = document.getElementById(data) as letterButtonType;
    const target = ev.target as HTMLElement & { dataset: DivData };
    console.log(source, target);
    if (!source || !target) return;

    // if (source.dataset.row === 'locked' && target.dataset.row === 'unlocked' && target.dataset.letterOG != source.dataset.currentLetter) return;

    if (source.dataset.row === 'unlocked' && target.dataset.row === 'locked') {
      if (target.dataset.currentLetter !== '') {
        const lockedRow = document.getElementById('lockedRow') as HTMLDivElement;
        const lockedLetters = lockedRow.getElementsByTagName('button') as HTMLCollectionOf<letterButtonType>;
        //find the next open letter to place the target
        for (let i = 0; i < lockedLetters.length; i++) {
          if (lockedLetters[i].dataset.currentLetter === '') {
            lockedLetters[i].dataset.currentLetter = target.dataset.currentLetter;
            lockedLetters[i].innerHTML = target.dataset.currentLetter;
            target.dataset.currentLetter = source.dataset.currentLetter;
            target.innerHTML = source.dataset.currentLetter;
            source.dataset.currentLetter = '';
            source.innerHTML = '';
            break;
          }
        }
        updateAll();
        return;
      }

      const tempTarget = Object.assign({}, target.dataset);
      target.dataset.currentLetter = source.dataset.currentLetter;
      target.innerHTML = source.dataset.currentLetter;
      source.dataset.currentLetter = tempTarget.currentLetter;
      source.innerHTML = tempTarget.currentLetter;
      updateAll();
      return;
    }

    if (source.dataset.row === 'unlocked' && target.dataset.row === 'unlocked') {

    }

    const tempTarget = Object.assign({}, target.dataset);
    target.dataset.currentLetter = source.dataset.currentLetter;
    target.innerHTML = source.dataset.currentLetter;
    source.dataset.currentLetter = tempTarget.currentLetter;
    source.innerHTML = tempTarget.currentLetter;
    updateAll();
  }
}



export namespace letterActions {
  export function swapLetters() {
    //find all marked letters in the lockedRow
    const lockedRow = document.getElementById('lockedRow') as HTMLDivElement;
    const unlockedRow = document.getElementById('unlockedRow') as HTMLDivElement;
    const markedLettersLocked = lockedRow.querySelectorAll('[data-marked="true"]') as NodeListOf<letterButtonType>;
    const markedLettersUnlocked = unlockedRow.querySelectorAll('[data-marked="true"]') as NodeListOf<letterButtonType>;
    //combine the two lists
    const markedLetters = Array.from(markedLettersLocked).concat(Array.from(markedLettersUnlocked));

    //swap the currentLetter and the innerHTML if there are two marked letters
    if (markedLetters.length === 2) {
      //check if both rows are from locked
      const firstLetter = markedLetters[0] as letterButtonType;
      const secondLetter = markedLetters[1] as letterButtonType;

      const firstLetterInnerHTML = firstLetter.dataset.currentLetter;
      const secondLetterInnerHTML = secondLetter.dataset.currentLetter;


      if (firstLetter.dataset.row === 'locked' && secondLetter.dataset.row === 'locked') {
        firstLetter.innerHTML = secondLetterInnerHTML;
        secondLetter.innerHTML = firstLetterInnerHTML;

        firstLetter.dataset.currentLetter = secondLetterInnerHTML;
        secondLetter.dataset.currentLetter = firstLetterInnerHTML;

        CipherAria.readSwapped(firstLetter, secondLetter);

      } else if (firstLetter.dataset.row === 'unlocked' && secondLetter.dataset.row === 'locked') {

        const lockedRow = document.getElementById('lockedRow') as HTMLDivElement;
        const lockedLetters = lockedRow.getElementsByTagName('button') as HTMLCollectionOf<letterButtonType>;

        const { ariaFirstSwapped, ariaSecondSwapped } = findNextOpenSpot(firstLetter, lockedLetters, secondLetter);
        if (ariaFirstSwapped !== null && ariaSecondSwapped !== null) {
          CipherAria.readSwapped(ariaFirstSwapped, ariaSecondSwapped);
        }

      } else if (firstLetter.dataset.row === 'locked' && secondLetter.dataset.row === 'unlocked') {
        const lockedRow = document.getElementById('lockedRow') as HTMLDivElement;
        const lockedLetters = lockedRow.getElementsByTagName('button') as HTMLCollectionOf<letterButtonType>;

        const { ariaFirstSwapped, ariaSecondSwapped } = findNextOpenSpot(secondLetter, lockedLetters, firstLetter);
        if (ariaFirstSwapped !== null && ariaSecondSwapped !== null) {
          CipherAria.readSwapped(ariaFirstSwapped, ariaSecondSwapped);
        }
      }

      unmarkAll();
      enableDisableButtons();
      updateAll();
    }
  }


  export function lockLetters() {
    //move all marked letters from the locked row to the unlocked row
    const lockedRow = document.getElementById('lockedRow') as HTMLDivElement;
    const markedLetters = lockedRow.querySelectorAll('[data-marked="true"]') as NodeListOf<letterButtonType>;

    function lockedToUnlocked(currentLetter: letterType, letter: letterButtonType) {
      let unlockedLetterDiv = document.getElementById('unlocked-letter-' + currentLetter) as letterButtonType;
      if (!unlockedLetterDiv) return;

      if (unlockedLetterDiv.innerHTML === '') {

        unlockedLetterDiv.dataset.marked = 'false';
        unlockedLetterDiv.dataset.currentLetter = currentLetter;
        unlockedLetterDiv.innerHTML = currentLetter;

        sendMessageToAriaReader(`Letter "${currentLetter}" moved to unmapped row`, 'assertive');

        letter.innerHTML = '';
        letter.dataset.marked = 'false';
        letter.dataset.currentLetter = '';

        Object.assign(letter.style, CSS.letterStyles.locked);
      } else {
        //find the next open letter to place the target
        const unlockedRow = document.getElementById('unlockedRow') as HTMLDivElement;
        const unlockedLetters = unlockedRow.getElementsByTagName('div') as HTMLCollectionOf<letterDivType>;
        for (let i = 0; i < unlockedLetters.length; i++) {
          if (unlockedLetters[i].dataset.currentLetter === '') {
            unlockedLetters[i].dataset.currentLetter = letter.dataset.currentLetter;
            unlockedLetters[i].innerHTML = letter.dataset.currentLetter;
            letter.dataset.currentLetter = '';
            letter.innerHTML = '';
            break;
          }
        }

      }
    }

    function unlockedToLocked(letter: letterButtonType) {
      //move all marked letters from the unlocked row to the locked row
      const lockedRow = document.getElementById('lockedRow') as HTMLDivElement;
      const lockedLetters = lockedRow.getElementsByTagName('button') as HTMLCollectionOf<letterButtonType>;
      //if there is a marked letter in the locked row position, move that letter to the next open position

      if (letter.dataset.currentLetter == '') {
        //find where in lockedRow the letter.dataset.letterOG is
        const letterOG = letter.dataset.letterOG;
        const letterOGIndex = Array.from(lockedLetters).findIndex((letter) => letter.dataset.currentLetter === letterOG);
        const letterOGDiv = lockedLetters[letterOGIndex] as letterButtonType;
        console.log(letterOGDiv);
        if (letterOGDiv !== undefined) {
          //swap the letterOGDiv with the letter
          const tempLetter = Object.assign({}, letterOGDiv.dataset);
          letterOGDiv.dataset.currentLetter = letter.dataset.currentLetter;
          letterOGDiv.innerHTML = letter.dataset.currentLetter;
          letter.dataset.currentLetter = tempLetter.currentLetter;
          letter.innerHTML = tempLetter.currentLetter;
        } else {
          letter.dataset.currentLetter = letter.dataset.letterOG;
          letter.innerHTML = letter.dataset.letterOG;


          const unlockedRow = document.getElementById('unlockedRow') as HTMLDivElement;
          const unlockedLetters = unlockedRow.getElementsByTagName('div') as HTMLCollectionOf<letterDivType>;
          //find letters letterOG matching with unlockedLetters currentLetter
          const letterOGIndex = Array.from(unlockedLetters).findIndex((letter) => letter.dataset.currentLetter === letterOG);
          const letterOGDiv = unlockedLetters[letterOGIndex] as letterDivType;
          console.log(letterOGDiv);
          letterOGDiv.dataset.currentLetter = '';
          letterOGDiv.innerHTML = '';
        }
        sendMessageToAriaReader('Letter ' + letter.dataset.letterOG + ' moved to mapped row');
        return
      }
      const { ariaFirstSwapped, ariaSecondSwapped } = findNextOpenSpot(letter, lockedLetters);
      if (ariaFirstSwapped !== null && ariaSecondSwapped !== null) {
        CipherAria.readSwapped(ariaFirstSwapped, ariaSecondSwapped);
      }
    }

    markedLetters.forEach((letter: letterButtonType) => {
      let currentLetter = letter.dataset.currentLetter;
      if (currentLetter != '') {
        lockedToUnlocked(currentLetter, letter);
      }
      if (currentLetter === '') {
        unlockedToLocked(letter);
      }
    });

    unmarkAll();
    enableDisableButtons();
    updateAll();
  }


  export function markLetter(letter: letterButtonType) {
    letter.dataset.marked = letter.dataset.marked === 'true' ? 'false' : 'true';

    CipherAria.readMarked(letter);

    letter.dataset.marked === 'true' ? Object.assign(letter.style, CSS.letterStyles['marked']) : Object.assign(letter.style, CSS.letterStyles['locked']);

    //check if two letters are marked
    let markedLetters = document.querySelectorAll('[data-marked="true"]') as NodeListOf<letterButtonType>;
    if (markedLetters.length === 2) {
      let firstLetter = markedLetters[0] as letterButtonType;
      let secondLetter = markedLetters[1] as letterButtonType;
      let l1 = firstLetter.dataset.currentLetter ? firstLetter.dataset.currentLetter : 'blank';
      let l2 = secondLetter.dataset.currentLetter ? secondLetter.dataset.currentLetter : 'blank';
      sendMessageToAriaReader(`"${l1}" and "${l2}" are marked. Press the letter "s" to swap the letter mapping.`, 'assertive');
    }

    enableDisableButtons();
    updateSentence();
  }

  function unmarkAll() {
    let markedLetters = document.querySelectorAll('[data-marked="true"]') as NodeListOf<letterButtonType>;
    markedLetters.forEach((letter: letterButtonType) => {
      letter.dataset.marked = 'false';
      if (letter.dataset.row === 'locked') {
        Object.assign(letter.style, CSS.letterStyles.locked);
      } else if (letter.dataset.row === 'unlocked') {
        Object.assign(letter.style, CSS.letterStyles.unlocked);
      }
    });
  }

  function enableDisableButtons() {
    let markedLetters = document.querySelectorAll('[data-marked="true"]') as NodeListOf<letterButtonType>;
    switch (markedLetters.length) {
      case 0:
        disableButton('swapButton');
        disableButton('lockButton');
        break;
      case 1:
        disableButton('swapButton');
        enableButton('lockButton');
        break;
      case 2:
        enableButton('swapButton');
        break;
      case 3:
        disableButton('swapButton');
        break;
      default:
        disableButton('swapButton');
        break;
    }
  }

  function disableButton(className: string) {
    const button = document.getElementsByClassName(className) as HTMLCollectionOf<HTMLButtonElement>;
    for (let i = 0; i < button.length; i++) {
      button[i].disabled = true;
      Object.assign(button[i].style, CSS.buttonStyles.disabled);
    }
  }

  function enableButton(className: string) {
    const button = document.getElementsByClassName(className) as HTMLCollectionOf<HTMLButtonElement>;
    for (let i = 0; i < button.length; i++) {
      button[i].disabled = false;
      Object.assign(button[i].style, CSS.buttonStyles.orange, CSS.buttonStyles.enabled);
      hoverStyle(button[i], CSS.buttonStyles.orange, CSS.buttonStyles.orangeHover);
    }
  }


  function findNextOpenSpot(unlockedLetter: letterButtonType, lockedLetters: HTMLCollectionOf<letterButtonType>, lockedLetter?: letterButtonType): { ariaFirstSwapped: letterButtonType | null, ariaSecondSwapped: letterButtonType | null } {
    if (lockedLetter) {

      for (let i = 0; i < lockedLetters.length; i++) {
        if (lockedLetters[i].dataset.currentLetter === '') {
          lockedLetters[i].dataset.currentLetter = lockedLetter.dataset.currentLetter;
          lockedLetters[i].innerHTML = lockedLetter.dataset.currentLetter;
          lockedLetter.dataset.currentLetter = unlockedLetter.dataset.currentLetter;
          lockedLetter.innerHTML = unlockedLetter.dataset.currentLetter;
          unlockedLetter.dataset.currentLetter = '';
          unlockedLetter.innerHTML = '';
          return { ariaFirstSwapped: lockedLetters[i], ariaSecondSwapped: unlockedLetter }
        }
      }
    } else {
      for (let i = 0; i < lockedLetters.length; i++) {
        if (lockedLetters[i].dataset.currentLetter === '') {
          console.log('found empty locked letter');
          console.log(unlockedLetter.dataset.letterOG)
          lockedLetters[i].dataset.currentLetter = unlockedLetter.dataset.letterOG;
          lockedLetters[i].innerHTML = unlockedLetter.dataset.letterOG;
          lockedLetters[i].dataset.marked = 'false';
          Object.assign(lockedLetters[i].style, CSS.letterStyles.locked);

          let unlockedLetterDiv = document.getElementById('unlocked-letter-' + unlockedLetter.dataset.letterOG) as letterButtonType;
          if (!unlockedLetterDiv) return { ariaFirstSwapped: null, ariaSecondSwapped: null };
          unlockedLetterDiv.dataset.currentLetter = '';
          unlockedLetterDiv.innerHTML = '';
          unlockedLetterDiv.dataset.marked = 'false';

          return { ariaFirstSwapped: unlockedLetter, ariaSecondSwapped: lockedLetters[i] };

        }
      }
    }
    return { ariaFirstSwapped: null, ariaSecondSwapped: null };
  }
}
