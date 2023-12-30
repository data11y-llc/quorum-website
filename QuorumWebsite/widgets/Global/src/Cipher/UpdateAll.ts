import { CipherGlobals } from './Globals.js';
import { createChart } from './Chart.js';
import { letterType, letterButtonType, alphabetCharType } from './Types.js';

export function updateLetterInnerHTML() {
  for (let i = 0; i < CipherGlobals.ALPHABET.length; i++) {
    const myDiv = document.getElementById('locked-letter-' + CipherGlobals.ALPHABET[i]) as letterButtonType;
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-current-letter') {
          console.log('locked letter changed');
          const currentLetter = myDiv.getAttribute('data-current-letter');
          myDiv.innerHTML = currentLetter as string;
        }
      });
    });
    observer.observe(myDiv, { attributes: true, attributeFilter: ['data-current-letter'] });
  }
  for (let i = 0; i < CipherGlobals.ALPHABET.length; i++) {
    const myDiv = document.getElementById('unlocked-letter-' + CipherGlobals.ALPHABET[i]) as letterButtonType;
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-current-letter') {
          console.log('unlocked letter changed');
          const currentLetter = myDiv.getAttribute('data-current-letter');
          myDiv.innerHTML = currentLetter as string;
        }
      });
    });
    observer.observe(myDiv, { attributes: true, attributeFilter: ['data-current-letter'] });
  }
}


function updateOgLetterFrequency(): void {
  const sentence = CipherGlobals.sentence;
  const frequency: Record<alphabetCharType, number> = { a: 0, b: 0, c: 0, d: 0, e: 0, f: 0, g: 0, h: 0, i: 0, j: 0, k: 0, l: 0, m: 0, n: 0, o: 0, p: 0, q: 0, r: 0, s: 0, t: 0, u: 0, v: 0, w: 0, x: 0, y: 0, z: 0 };
  const totalLetters = sentence.length;

  for (let i = 0; i < totalLetters; i++) {
    const letter: alphabetCharType = sentence[i] as alphabetCharType;
    //only include alphabet characters
    if (CipherGlobals.ALPHABET.includes(letter)) {
      frequency[letter] = (frequency[letter] || 0) + 1;
    }
  }

  for (const letter in frequency) {
    const currentLetter = letter as alphabetCharType;
    frequency[currentLetter] = (frequency[currentLetter] / totalLetters) * 100;
  }

  //order the frequency object to be the same order as lockedRow children letter.letterOG
  const lockedRow = document.getElementById('lockedRow')
  if (lockedRow) {
    const lockedRowChildren = lockedRow.children;
    const lockedRowChildrenLetter: letterType[] = [];
    for (let i = 0; i < lockedRowChildren.length; i++) {
      const letter = (lockedRowChildren[i] as letterButtonType).dataset.letterOG;
      lockedRowChildrenLetter.push(letter);
    }

    const frequencyOrdered: Partial<Record<alphabetCharType, number>> = {};
    for (let i = 0; i < lockedRowChildrenLetter.length; i++) {
      const letter = lockedRowChildrenLetter[i];
      const freq = frequency[letter as alphabetCharType];
      if (freq != undefined) {
        frequencyOrdered[letter as alphabetCharType] = freq
      }
    }

    let i = 0;
    for (const letter in frequencyOrdered) {
      const letterDiv = document.getElementById('locked-letter-' + CipherGlobals.ALPHABET[i]) as letterButtonType;
      const ogFrequency = frequencyOrdered[letter as alphabetCharType];
      if (ogFrequency != undefined) {
        letterDiv.dataset.ogFrequency = ogFrequency
      }
      i++
    }

    CipherGlobals.OG_MESSAGE_FREQUENCY = frequencyOrdered as Record<alphabetCharType, number>;
  }
}

export function updateSentence(): void {
  // Select the sentence element and the locked letters
  const sentenceElement = document.getElementById('sentence');
  const lockedLetters = document.querySelectorAll('#lockedRow button') as NodeListOf<letterButtonType>;

  // Return if the sentence element or locked letters do not exist
  if (!sentenceElement || !lockedLetters) return;

  // Create a map to store the mapping between original and current letters
  const letterMapping = new Map<string, string>();
  lockedLetters.forEach(lockedElement => letterMapping.set(lockedElement.dataset.letterOG, lockedElement.dataset.currentLetter));

  // Use the map to build the new sentence
  let newSentence = '<span class="word" data-word-count="0">';
  const sentenceArray: string[] = CipherGlobals.sentence.toLowerCase().split('')
  let wordCount = 0;
  let charCount = 0;


  const markedLetters = document.querySelectorAll('[data-marked="true"]') as NodeListOf<letterButtonType>;
  const markedLettersArray: string[] = [];
  markedLetters.forEach(letter => markedLettersArray.push(letter.dataset.currentLetter as string));

  sentenceArray.forEach(letter => {
    if (letterMapping.has(letter)) {
      const currentLetter = letterMapping.get(letter);
      //classes are not used for styling
      //if a letter is marked then bold that letter

      //if letter is marked then bold it
      const bold = markedLettersArray.includes(currentLetter as string) ? 'font-weight: bold;' : '';


      if (currentLetter === '') {
        newSentence += `<span data-locked="unlocked" data-char-count="${charCount}" style="background-color: yellow ${bold}" class='character' data-locked="false">${letter}</span>`;
      } else {
        newSentence += `<span data-locked="locked" class='character' data-char-count="${charCount}" data-locked="true" style="${bold}">${currentLetter}</span>`;
      }
      charCount++;
    } else {
      if (letter === ' ') {
        wordCount++;
        newSentence += `</span>
        <span class="space" data-char-count="${charCount}">${letter}
        </span><span class='word' data-word-count="${wordCount}">`;
        charCount++;
      }
      else {
        //for punctuation
        newSentence += `<span class='non-alph'>${letter}</span>`;
      }
    }
  });

  // Update the sentence element with the new sentence
  sentenceElement.innerHTML = newSentence;
}

/**
  * Updates the frequency chart with the current letter mapping
  * Updates the sentence
  * Updates the quorum chart
  */
export async function updateAll() {
  updateOgLetterFrequency();
  updateSentence();
  createChart();
}
