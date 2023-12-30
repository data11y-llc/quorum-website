import { letterType, letterButtonType, alphabetCharType } from './Types.js';
import { CipherGlobals } from './Globals.js';
import { updateAll } from './UpdateAll.js';

/**
  * @fileoverview LettersSort - handles the sorting functions
**/
function getLockedandUnlockedRows(): { lockedMap: Map<letterButtonType, letterType>, unlockedMap: Map<letterButtonType, letterType> } {
  // Select the locked row element and the locked letters
  const lockedRow = document.getElementById('lockedRow') as HTMLDivElement;
  const unlockedRow = document.getElementById('unlockedRow') as HTMLDivElement;

  const lockedLetters = lockedRow.children as HTMLCollectionOf<letterButtonType>;
  const unlockedLetters = unlockedRow.children as HTMLCollectionOf<letterButtonType>;

  // Create maps for locked letters and unlocked letters
  const lockedMap = createMap(lockedLetters);
  const unlockedMap = createMap(unlockedLetters);

  return { lockedMap, unlockedMap };
}

function clearRows() {
  const lockedRowDiv = document.getElementById('lockedRow') as HTMLDivElement;
  const lockedChildren = lockedRowDiv.children;
  for (let i = 0; i < lockedChildren.length; i++) {
    const child = lockedChildren[i] as letterButtonType;
    child.innerHTML = '';
    child.dataset.currentLetter = '';
  }

  const unlockedRowDiv = document.getElementById('unlockedRow') as HTMLDivElement;
  const unlockedChildren = unlockedRowDiv.children;
  for (let i = 0; i < unlockedChildren.length; i++) {
    const child = unlockedChildren[i] as letterButtonType;
    child.innerHTML = '';
    child.dataset.currentLetter = '';
  }
}


function createMap(letterDivs: HTMLCollectionOf<letterButtonType>) {
  // Create a map for the letters
  const map = new Map<letterButtonType, letterType>();

  // Loop through the letters and update the map with the elements from the array
  for (let i = 0; i < letterDivs.length; i++) {
    const letter = letterDivs[i];
    map.set(letter, letter.dataset.currentLetter);
  }

  return map;
}


function replaceLetters(sortedMap: Map<letterButtonType, string>, row: 'locked' | 'unlocked' | 'original') {
  if (sortedMap.size === 0) return;
  let i = 0
  for (const [_, value] of sortedMap) {
    if (value != '') {
      let letter = document.getElementById(row + '-letter-' + CipherGlobals.ALPHABET[i]) as letterButtonType;
      //do while is for when the letter above or below is already filled
      do {
        letter = document.getElementById(row + '-letter-' + CipherGlobals.ALPHABET[i]) as letterButtonType;
        i++
      } while (letter.dataset.currentLetter != '')
      letter.dataset.currentLetter = value as letterType;
    }
  }
}

export namespace originals {
  const setLetterProperties = (
    id: string,
    letter: letterType,
    map: Map<letterButtonType, letterType>
  ) => {
    const element = document.getElementById(id) as letterButtonType;
    if (Array.from(map.values()).includes(letter)) {
      element.dataset.currentLetter = letter;
      element.dataset.letterOG = letter;
    } else {
      element.dataset.currentLetter = "";
      element.dataset.letterOG = letter;
    }
  };

  export function aToZ() {
    const { lockedMap, unlockedMap } = getLockedandUnlockedRows();
    clearRows();

    for (const currentLetter of CipherGlobals.ALPHABET) {
      const originalLetter = document.getElementById('original-letter-' + currentLetter) as letterButtonType;
      originalLetter.innerHTML = currentLetter;
    }

    for (const currentLetter of CipherGlobals.ALPHABET) {
      const lockedId = 'locked-letter-' + currentLetter;
      setLetterProperties(lockedId, currentLetter as letterType, lockedMap);
    }

    for (const currentLetter of CipherGlobals.ALPHABET) {
      const unlockedId = 'unlocked-letter-' + currentLetter;
      setLetterProperties(unlockedId, currentLetter as letterType, unlockedMap);
    }

    updateAll();
  }



  export function byPercentage() {
    const { lockedMap, unlockedMap } = getLockedandUnlockedRows();
    clearRows();

    const sortedFrequencies = Object.fromEntries(
      Object.entries(CipherGlobals.OG_MESSAGE_FREQUENCY).sort((a, b) => b[1] - a[1])
    );

    let i = 0;
    for (const [freqLetter, _] of Object.entries(sortedFrequencies)) {
      const originalLetter = document.getElementById('original-letter-' + CipherGlobals.ALPHABET[i]) as letterButtonType;
      originalLetter.innerHTML = freqLetter;
      i++;
    }

    i = 0;
    for (const [freqLetter, _] of Object.entries(sortedFrequencies)) {
      const lockedId = 'locked-letter-' + CipherGlobals.ALPHABET[i];
      setLetterProperties(lockedId, freqLetter as letterType, lockedMap);
      i++;
    }

    i = 0;
    for (const [freqLetter, _] of Object.entries(sortedFrequencies)) {
      const unlockedId = 'unlocked-letter-' + CipherGlobals.ALPHABET[i];
      setLetterProperties(unlockedId, freqLetter as letterType, unlockedMap);
      i++;
    }
    updateAll();
  }
}

export namespace substitution {

  /**
    * @description used to randomize a map, used for random()
    */
  function shuffleMap(map: Map<letterButtonType, letterType>) {
    // Convert the map to an array of entries
    const entries = [...map.entries()];

    // Fisher-Yates shuffle the entries
    for (let i = entries.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i));
      [entries[i], entries[j]] = [entries[j], entries[i]];
    }
    // Create a new map from the shuffled entries
    return new Map(entries);
  }

  function replaceLocked(sortedMap: Map<letterButtonType, letterType>): letterType[] {

    const usedDivs: letterType[] = [];

    const rowDiv = document.getElementById('lockedRow') as HTMLDivElement;
    const children = rowDiv.children as HTMLCollectionOf<letterButtonType>;

    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      child.dataset.currentLetter = '';
    }

    let i = 0
    for (const [_, value] of sortedMap) {
      const letter = document.getElementById('locked-letter-' + CipherGlobals.ALPHABET[i]) as letterButtonType;
      letter.dataset.currentLetter = value;
      i++
    }

    const newChildren = rowDiv.children as HTMLCollectionOf<letterButtonType>;
    for (let i = 0; i < newChildren.length; i++) {
      const child = newChildren[i]
      if (child.dataset.currentLetter == '' && child.dataset.letterOG != undefined) {
        usedDivs.push(child.dataset.letterOG)
      }
    }

    return usedDivs;
  }

  function replaceUnlocked(sortedMap: Map<letterButtonType, letterType>, openSpots: letterType[]) {

    if (openSpots.length == 0) return;
    console.log(openSpots);
    const openSpotsDivs: letterButtonType[] = [];
    const openDiv = document.getElementById('unlockedRow') as HTMLDivElement;
    const openChildren = openDiv.children;
    for (let i = 0; i < openChildren.length; i++) {
      const child = openChildren[i] as letterButtonType;
      //search for child.letterOG that is in openSpots
      if (openSpots.includes(child.dataset.letterOG as letterType)) {
        //replace the letter in open spots with the div
        openSpotsDivs[openSpots.indexOf(child.dataset.letterOG as letterType)] = child;
      }
    }

    const rowDiv = document.getElementById('unlockedRow') as HTMLDivElement;
    const children = rowDiv.children;
    for (let i = 0; i < children.length; i++) {
      const child = children[i] as letterButtonType;
      child.dataset.currentLetter = '';
    }

    let i = 0;
    for (const [_, value] of sortedMap) {
      if (value) {
        const letter = openSpotsDivs[i];
        letter.dataset.currentLetter = value as letterType;
        i++
      }
    }
  }

  //reset button function
  export function moveLockedToUnlocked() {
    // aToZ()
    const { lockedMap } = getLockedandUnlockedRows();

    // Replace the letters in the unlocked row with the locked map
    replaceLetters(lockedMap, 'unlocked');

    //clear the locked row values and dataset.currentValues
    for (let i = 0; i < CipherGlobals.ALPHABET.length; i++) {
      const letter = document.getElementById('locked-letter-' + CipherGlobals.ALPHABET[i]) as letterButtonType;
      letter.dataset.currentLetter = '';
    }
    updateAll()
  }

  //apply button function
  export function moveUnlockedToLocked() {
    // aToZ()
    const { unlockedMap } = getLockedandUnlockedRows();
    console.log(unlockedMap);

    // Replace the letters in the locked row with the unlocked map
    replaceLetters(unlockedMap, 'locked');

    //clear the unlocked row values and dataset.currentValues
    for (let i = 0; i < CipherGlobals.ALPHABET.length; i++) {
      const letter = document.getElementById('unlocked-letter-' + CipherGlobals.ALPHABET[i]) as letterButtonType;
      letter.dataset.currentLetter = '';
    }
    updateAll();
  }

  export function random(): void {
    const { lockedMap, unlockedMap } = getLockedandUnlockedRows();
    clearRows();

    // Shuffle the locked map
    const shuffledLockedMap = shuffleMap(lockedMap);
    const shuffledUnlockedMap = shuffleMap(unlockedMap);

    const openSpots = replaceLocked(shuffledLockedMap);
    replaceUnlocked(shuffledUnlockedMap, openSpots);

    updateAll();
  }


  export function aToZ(): void {
    const { lockedMap, unlockedMap } = getLockedandUnlockedRows();
    clearRows();

    const setLetterProperties = (id: string, letter: alphabetCharType, map: Map<letterButtonType, letterType>) => {
      const element = document.getElementById(id) as letterButtonType;
      if (Array.from(map.values()).includes(letter)) {
        element.dataset.currentLetter = letter;
      } else {
        element.dataset.currentLetter = '';
      }
    }

    for (const letter of CipherGlobals.ALPHABET) {
      const currentLetter = letter as alphabetCharType
      const lockedId = 'locked-letter-' + currentLetter;
      setLetterProperties(lockedId, currentLetter, lockedMap);
    }

    for (const letter of CipherGlobals.ALPHABET) {
      const currentLetter = letter as alphabetCharType
      const unlockedId = 'unlocked-letter-' + currentLetter;
      setLetterProperties(unlockedId, currentLetter, unlockedMap);
    }

    updateAll();
  }

  export function byPercentage(): void {
    const { lockedMap, unlockedMap } = getLockedandUnlockedRows();
    clearRows();

    const sortedFrequencies = Object.fromEntries(Object.entries(CipherGlobals.STD_ENGLISH_FREQUENCY).sort((a, b) => b[1] - a[1]));

    let i = 0;
    for (var key in sortedFrequencies) {
      const currentLetter = key as letterType;
      const letterDiv = document.getElementById('locked-letter-' + CipherGlobals.ALPHABET[i]) as letterButtonType;
      if (Array.from(lockedMap.values()).includes(currentLetter)) {
        letterDiv.dataset.currentLetter = currentLetter;
        letterDiv.innerHTML = currentLetter;
      } else {
        letterDiv.dataset.currentLetter = '';
        letterDiv.innerHTML = '';

      }
      i++;
    }

    let j = 0;
    for (var key in sortedFrequencies) {
      const currentLetter = key as letterType;
      const letterDiv = document.getElementById('unlocked-letter-' + CipherGlobals.ALPHABET[j]) as letterButtonType;
      if (Array.from(unlockedMap.values()).includes(currentLetter)) {
        letterDiv.dataset.currentLetter = currentLetter;
        letterDiv.innerHTML = currentLetter;
      } else {
        letterDiv.dataset.currentLetter = '';
        letterDiv.innerHTML = '';
      }
      j++;
    }
    updateAll()
  }
}
