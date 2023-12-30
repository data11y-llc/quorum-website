import type * as CSSType from "csstype";
import { Pitch, RATE } from "./Globals.js";

let currentWordIndex = 0;
let currentlySpeaking: 'character' | 'word' | null = null;
let cancelSpeech = false;

const wordUnderlineStyle: CSSType.Properties = {
  textDecoration: 'underline',
  textDecorationColor: 'red',
  textDecorationThickness: '2px',
  textDecorationSkipInk: 'none',
  textDecorationSkip: 'none',
}

const wordStyle: CSSType.Properties = {
  textDecoration: 'none',
}

export function readInstructions() {
  let voices = window.speechSynthesis.getVoices()
  console.log(voices);

  var utterance = new SpeechSynthesisUtterance('If using a screen reader, pause the screen reader while this reads instructions. Pressing r will read the words out loud, pressing capital R will read each character one at a time.');
  utterance.pitch = Pitch.normal;
  speechSynthesis.speak(utterance);

  var utterance = new SpeechSynthesisUtterance('tones with this current pitch are in the locked position');
  utterance.pitch = Pitch.locked;
  speechSynthesis.speak(utterance);

  utterance = new SpeechSynthesisUtterance('and tones with this pitch are in the unlocked position');
  utterance.pitch = Pitch.unlocked;
  speechSynthesis.speak(utterance);

  utterance = new SpeechSynthesisUtterance('. You can press r or capital R again to stop the speech. Pause the voice reader while the sentence is being read to you');
  utterance.pitch = Pitch.normal;
  speechSynthesis.speak(utterance);
}

export function readCharacters() {
  if (speechSynthesis.speaking) {
    removeUnderline();
    cancelSpeech = true;
    changeSentenceFontSize();
    speechSynthesis.cancel();
  } else {
    removeUnderline();
    speechSynthesis.cancel();
    cancelSpeech = false;
    currentWordIndex = 0;
    changeSentenceFontSize('1.5em');
    currentlySpeaking = 'character';
    speakText('character');
  }
}

export function readWords() {
  if (speechSynthesis.speaking) {
    removeUnderline();
    changeSentenceFontSize();
    speechSynthesis.cancel();
    cancelSpeech = true;
  } else {
    removeUnderline();
    speechSynthesis.cancel();
    cancelSpeech = false;
    changeSentenceFontSize('1.5em');
    currentlySpeaking = 'word';
    currentWordIndex = 0;
    currentlySpeaking = 'word';
    let sentence = document.getElementById("sentence") as HTMLParagraphElement;
    if (sentence && sentence.textContent) {
      speakText('word');
    }
  }
}

function removeUnderline() {
  const spans = document.getElementsByTagName('span');
  Array.from(spans).forEach(span => {
    Object.assign(span.style, wordStyle);
  });
}

//if the focus is taken off of the webpage then cancel the speech
window.addEventListener('blur', () => {
  currentWordIndex = 0;
  removeUnderline();
  changeSentenceFontSize();
  speechSynthesis.cancel();
})

//when the page reloads stop the speech
window.addEventListener('beforeunload', () => {
  removeUnderline();
  changeSentenceFontSize();
  speechSynthesis.cancel();
});


const speakText = (speakType: 'character' | 'word') => {
  const spans = getWordAmount(speakType);

  const words = spans.map(span => {
    if (speakType === 'character' && span.classList.contains('space')) {
      return { text: ' ', locked: false, wordLength: 1, space: true };
    } else if (speakType === 'word' && span.classList.contains('space')) {
      return { text: '', locked: false, wordLength: 1, space: true };
    }
    return { text: span.textContent, locked: span.dataset.locked === 'locked' ? true : false, wordLength: span.textContent?.replace(/[^a-zA-Z]/g, '').length }
  }).filter(word => word.text !== '');

  const utterance = new SpeechSynthesisUtterance(`reading-${currentlySpeaking}s`);
  utterance.rate = 1;
  utterance.pitch = Pitch.locked;

  //for character, if the character is locked, then underline read it in a pitch of 1

  function onBoundary() {
    utterance.rate = RATE;
    const index = currentWordIndex;
    if (speakType === 'character') {
      let char = words[index].text;
      if (char === undefined || char === null) return console.log('char is undefined');
      utterance.text = char;
      utterance.pitch = words[index].locked ? Pitch.locked : Pitch.unlocked;
    } else if (speakType === 'word') {
      var word = words[index].text as string;
      var wordLength = words[index].wordLength as number;
      utterance.text = `word-length,${wordLength},${word}`;
      let span = document.querySelector(`[data-word-count="${currentWordIndex}"]`) as HTMLSpanElement;
      if (span) {
        let locked = Array.from(span.children).some(s => s.dataset.locked === 'locked');
        utterance.pitch = locked ? Pitch.locked : Pitch.unlocked;
      }
    }

    if (words[index].space && speakType === 'character') {
      utterance.text = 'space';
      utterance.pitch = Pitch.normal;
    }

    underlineWord(speakType);
    speechSynthesis.speak(utterance);
  }


  utterance.onend = () => {
    console.log('onend');
    if (!cancelSpeech) {
      if (words.length === currentWordIndex - 1) {
        currentWordIndex = 0;
        speechSynthesis.cancel();
        removeUnderline();
        changeSentenceFontSize();
      } else {
        onBoundary();
        currentWordIndex++;
      }
    }
  };
  speechSynthesis.speak(utterance);
};

function getWordAmount(speakType: 'character' | 'word'): HTMLSpanElement[] {
  const sentence = document.getElementById('sentence') as HTMLParagraphElement;
  const spans = sentence.getElementsByTagName('span');
  //get spans that have class word
  const wordSpans = Array.from(spans).filter(span => {
    //contains speakType or 'space'
    return span.classList.contains(speakType) || span.classList.contains('space');
  });
  return wordSpans;
}

function underlineWord(speakType: 'character' | 'word') {
  let searchTerm = speakType === 'character' ? 'char' : 'word';

  let span = document.querySelector(`[data-${searchTerm}-count="${currentWordIndex}"]`) as HTMLSpanElement;
  if (!span) return;

  let prevSpan = document.querySelector(`[data-${searchTerm}-count="${currentWordIndex - 1}"]`) as HTMLSpanElement;
  prevSpan && Object.assign(prevSpan.style, wordStyle);

  Object.assign(span.style, wordUnderlineStyle)
}


function changeSentenceFontSize(fontSize: string = "1.3em") {
  const sentence = document.getElementById('sentence') as HTMLParagraphElement;
  if (!sentence) return;
  sentence.style.fontSize = fontSize;
}

//export function fastForward() {
//  speechSynthesis.cancel();
//  currentWordIndex++;

//  //say how what word out of how many words
//  if (currentlySpeaking == null) return console.log('currentlySpeaking is null');
//  var words = getWordAmount(currentlySpeaking);

//  let utterance = new SpeechSynthesisUtterance(currentWordIndex + 1 + " words out of " + words.length);
//  utterance.pitch = Pitch.locked;
//  utterance.rate = RATE;
//  speechSynthesis.speak(utterance);

//  if (currentlySpeaking != null) {
//    speakText(currentlySpeaking);
//  }
//  return utterance;
//}

//export function rewind() {
//  speechSynthesis.cancel();
//  currentWordIndex--;
//  if (currentlySpeaking == null) return console.log('currentlySpeaking is null');
//  var words = getWordAmount(currentlySpeaking);

//  let utterance = new SpeechSynthesisUtterance(currentWordIndex + 1 + " words out of " + words.length);
//  utterance.pitch = Pitch.locked;
//  utterance.rate = RATE;
//  speechSynthesis.speak(utterance);
//  if (currentlySpeaking != null) {
//    speakText(currentlySpeaking);
//  }
//}
