import { formatSVG } from "../UiKit/atoms/icons/showIcons";
import { Slider } from "../UiKit/atoms/slider/slider";
import { createElement } from "../util/helper";
import { stopIconBlack } from "../util/icons";
import { MSDE_BASE_URL } from "../util/versionNumbers";
import { AssetInfo } from "./assetJson";

export const runIcon = `
<svg width="12" height="15" viewBox="0 0 12 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.5 0.779663V14.7797L11.5 7.77966L0.5 0.779663Z" fill="#000"/>
</svg>`

export class AudioPlayer {
  audioURL: string;
  playButton: HTMLButtonElement;
  id: string
  assetInfo: AssetInfo
  container: HTMLDivElement;
  audioElement: HTMLAudioElement;
  leftSide: HTMLDivElement;
  rightSide: HTMLDivElement;

  constructor(audioURL: string, id: string, assetInfo: AssetInfo) {
    this.audioURL = audioURL;
    this.id = id;
    this.assetInfo = assetInfo;
    this.container = createElement('div', {
      uniqueIdPrefix: this.id,
      id: `audio-player-container`,
      addClass: 'audio-player-container',
    }) as HTMLDivElement;
    this.leftSide = createElement('div', {
      uniqueIdPrefix: this.id,
      id: `left-side`,
      addClass: 'asset-getter-left-side',
      appendTo: this.container,
    }) as HTMLDivElement;
    this.rightSide = createElement('div', {
      uniqueIdPrefix: this.id,
      id: `right-side`,
      addClass: 'asset-getter-right-side',
      appendTo: this.container,
    }) as HTMLDivElement;
    this.createAudioElement(this.audioURL);
    this.createSongThumbnail();
    this.createSongTitle();
    this.createAudioControls();

  }

  getElement(): HTMLDivElement {
    return this.container;
  }

  createSongThumbnail() {
    const songThumbnailContainer = createElement("div", {
      uniqueIdPrefix: this.id,
      id: "song-thumbnail-container",
      addClass: "song-thumbnail-container",
      appendTo: this.leftSide,
    });

    createElement("img", {
      src: `${MSDE_BASE_URL}/msde-deploy/CSP/Assets/Images/speaker.png`,
      addClass: "song-thumbnail",
      appendTo: songThumbnailContainer,
    }) as HTMLImageElement;
  }

  createAudioElement(soundURL: string) {
    this.audioElement = createElement("audio", {
      src: soundURL,
    });
  }

  createSongTitle() {
    const songTitle = createElement("div", {
      uniqueIdPrefix: this.id,
      id: "song-title-container",
      addClass: "song-title-container",
      appendTo: this.rightSide,
    });

    //make two text spans one for the song name and one for the url
    createElement("h3", {
      addClass: "song-name",
      innerHTML: this.assetInfo.name,
      appendTo: songTitle,
    });

    createElement("p", {
      addClass: "song-url",
      innerHTML: this.assetInfo.url,
      appendTo: songTitle,
    });
  }

  createAudioControls() {
    const playControlsDiv = createElement("div", {
      addClass: "play-controls",
      appendTo: this.rightSide
    });

    const playPauseButton = this.createPlayPauseButton(this.audioElement);
    const progressBar = this.createProgressBar(this.audioElement);
    const timeDisplay = this.createTimeDisplay(this.audioElement);

    progressBar.render(playControlsDiv);
    playControlsDiv.appendChild(timeDisplay);
    playControlsDiv.appendChild(playPauseButton);
  }

  createPlayPauseButton(audioElement: HTMLAudioElement): HTMLButtonElement {
    const stopIconNew = formatSVG(stopIconBlack, 'icon-text__neutral__black-size-1')?.outerHTML;
    this.playButton = createElement("button", {
      innerHTML: runIcon,
      addStyle: {
        //remove styleing from button so its just the icon
        backgroundColor: "transparent",
        border: "none",
      },
      onclick: () => {
        if (audioElement.paused) {
          audioElement.play();
          this.playButton.innerHTML = stopIconNew + `\n pause`;
          this.playButton.ariaLabel = "Stop";
        } else {
          audioElement.pause();
          this.playButton.innerHTML = runIcon + `\n play`;
          this.playButton.ariaLabel = "Play";
        }
      }
    });
    this.playButton.click();
    return this.playButton;
  }

  createProgressBar(audioElement: HTMLAudioElement): Slider {
    const progressBar = new Slider({
      uniqueIdPrefix: this.id,
      id: "progress-bar",
      min: 0,
      value: 0,
      max: Infinity,
      bigStep: 1000,
      label: "",
      step: 10,
    })

    progressBar.sliderContainer.style.justifyContent = "center";
    progressBar.label.style.display = "none";

    let maxDuration: number;

    audioElement.addEventListener("loadedmetadata", () => {
      progressBar.max = audioElement.duration * 1000
      maxDuration = audioElement.duration;
    });

    audioElement.addEventListener("timeupdate", () => {
      const progress = audioElement.currentTime * 1000;
      progressBar.value = progress
    });

    progressBar.slider.addEventListener("input", () => {
      let max = progressBar.value / 1000;
      if (max > maxDuration) max = maxDuration;
      audioElement.currentTime = max;
    });

    audioElement.addEventListener("ended", () => {
      this.playButton.innerHTML = runIcon + `\n play`;
    });

    return progressBar;
  }

  createTimeDisplay(audioElement: HTMLAudioElement): HTMLSpanElement {
    const timeDisplay = createElement("span", { addClass: "time-display" });

    let maxDuration: number;

    audioElement.addEventListener("loadedmetadata", () => {
      maxDuration = audioElement.duration;
      timeDisplay.textContent = `${this.formatTime(maxDuration)}`;
    });

    return timeDisplay;
  }


  formatTime(time: number): string {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    let milliseconds = Math.floor((time % 1) * 1000); // Capture milliseconds part
    //cut off the milliseconds to 2 digits
    milliseconds = milliseconds.toString().substring(0, 2) as unknown as number;
    return `${seconds < 10 ? '0' : ''}${seconds}.${milliseconds}`;
  }
}
