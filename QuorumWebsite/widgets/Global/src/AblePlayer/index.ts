import { getSingleFileOnCanvas } from "../util/canvasApi.js";
import { LinkCSS, LoadScript, updateElement } from "../util/helper.js";
import { MSDE_BASE_URL } from "../util/versionNumbers.js";

const Loader = document.querySelectorAll(".data11y-able-player") as NodeListOf<HTMLDivElement>;

if (Loader) {
  // An array to hold all our promises
  const promises: Promise<any>[] = [];

  for (const dcContainer of Loader) {
    const randomID = `data11y_${dcContainer.id}_${Math.random().toString(36).substring(2, 8)}_`;

    // Add Flexbox styles for centering video
    dcContainer.style.display = "flex";
    dcContainer.style.justifyContent = "center";
    dcContainer.style.alignItems = "center";

    const videoName = dcContainer.getAttribute('data-video-name');
    const youtubeUrl = dcContainer.getAttribute('data-youtube-url');

    if (youtubeUrl) {
      // <div id="data11y_able_player_1" data-youtube-url="https://www.youtube.com/watch?v=9Jz1TjCphXE"></div>
      const youtubeId = new URLSearchParams(new URL(youtubeUrl).search).get('v');

      if (youtubeId) {
        const ableVideoHTML = `
        <video 
          id="video_${randomID}" 
          data-skin="2020"
          data-able-player 
          width="480" 
          height="360" 
          data-youtube-id="${youtubeId}" 
        >
        </video>
      `;



        updateElement(dcContainer, {
          id: randomID,
          innerHTML: ableVideoHTML,
        });
      }
    }
    else if (videoName) {
      // <div id="data11y_able_player_1" data-video-name="video.mp4"></div>
      promises.push(getSingleFileOnCanvas(videoName, 'url').then((url) => {
        const captionURL = `${MSDE_BASE_URL}/msde-deploy/widgets/ablePlayer/captions/`;
        const descriptionURL = `${MSDE_BASE_URL}/msde-deploy/widgets/ablePlayer/descriptions/`;
        const dataCaptionName = dcContainer.getAttribute('data-caption-name');
        const dataDescriptionName = dcContainer.getAttribute('data-description-name');

        let captionTrack = '';
        let descriptionTrack = '';

        if (dataCaptionName) {
          captionTrack = `<track kind="captions" src="${captionURL}${dataCaptionName}"/>`;
        }

        if (dataDescriptionName) {
          descriptionTrack = `<track kind="descriptions" src="${descriptionURL}${dataDescriptionName}"/>`;
        }

        const ableVideoHTML = `
  <video 
  id="video_${randomID}" 
  data-able-player 
  preload="auto" 
  width="480" 
  height="360">
    <source type="video/mp4" src="${url}"/>
    ${captionTrack}
    ${descriptionTrack}
  </video>
`;

        updateElement(dcContainer, {
          id: randomID,
          innerHTML: ableVideoHTML,
        });
      }));
    }
  }

  // Use Promise.all to wait for all the promises to resolve, then call the LoadScript functions
  Promise.all(promises).then(async () => {
    try {
      await LoadScript('https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js')
      await LoadScript('https://cdn.jsdelivr.net/npm/js-cookie@3.0.5/dist/js.cookie.min.js');
      await LinkCSS(`${MSDE_BASE_URL}/msde-deploy/widgets/ablePlayer/build/ableplayer.min.css`);
      await LoadScript(`${MSDE_BASE_URL}/msde-deploy/widgets/ablePlayer/build/ableplayer.min.js`);
    } catch (e) {
      console.log(e);
    }
  });
}

