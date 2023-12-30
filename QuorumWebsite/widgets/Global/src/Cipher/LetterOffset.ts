import { letterButtonType } from './Types.js';
import { updateAll } from './UpdateAll.js';
const ALPHABET_LENGTH = 26;

/**
  * @fileoverview OffsetSwap - handles the offset control functions
  * the '<', input, '>' elements
  */
export namespace OffsetSwap {
  export var currentOffset = 0;

  function changeOffsetEl(direction: 'right' | 'left') {
    const offset = document.getElementById('offset') as HTMLInputElement;
    if (!offset) return;

    const newValue = (direction === 'left'
      ? (Number(offset.value) - 1 + ALPHABET_LENGTH) % ALPHABET_LENGTH
      : (Number(offset.value) + 1) % ALPHABET_LENGTH);
    offset.value = newValue.toString();
    currentOffset = newValue;
  }

  export function decrement(changeOffset = true) {
    const lockedRow = document.getElementById('lockedRow') as HTMLDivElement;
    const lockedLetters = lockedRow.getElementsByTagName('button') as HTMLCollectionOf<letterButtonType>;
    const firstLetter = Object.assign({}, lockedLetters[0].dataset);

    for (let i = 0; i < lockedLetters.length - 1; i++) {
      lockedLetters[i].dataset.currentLetter = lockedLetters[i + 1].dataset.currentLetter;
    }

    lockedLetters[lockedLetters.length - 1].dataset.currentLetter = firstLetter.currentLetter;

    if (changeOffset) {
      changeOffsetEl('left');
      updateAll();
    }
  }

  export function increment(changeOffset = true) {
    const lockedRow = document.getElementById('lockedRow') as HTMLDivElement;
    const lockedLetters = lockedRow.getElementsByTagName('button') as HTMLCollectionOf<letterButtonType>;
    let lastLetter = Object.assign({}, lockedLetters[lockedLetters.length - 1].dataset);

    for (let i = lockedLetters.length - 1; i > 0; i--) {
      lockedLetters[i].dataset.currentLetter = lockedLetters[i - 1].dataset.currentLetter;
    }

    lockedLetters[0].dataset.currentLetter = lastLetter.currentLetter;

    if (changeOffset) {
      changeOffsetEl('right');
      updateAll();
    }
  }

  export function moveFromInput() {
    const offset = document.getElementById('offset') as HTMLInputElement;
    if (!offset) return;

    const offsetValue = Number(offset.value);
    const numMoves = Math.abs(offsetValue - currentOffset);
    if (numMoves === 0) return;

    for (let i = 0; i < numMoves; i++) {
      if (offsetValue > currentOffset) {
        increment(false);
      } else {
        decrement(false);
      }
    }
    currentOffset = offsetValue;
    updateAll();
  }
}
