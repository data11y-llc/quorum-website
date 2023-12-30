import { SelectedList } from "../UiKit/atoms/selectionList/selectionList";
import { ImageStats } from "../util/ImageStats";
import { convertRGBValuesToEnglishNames } from "../util/colorNames";
import { createElement } from "../util/helper";

export class Results {
  id: string;
  container: HTMLDivElement;
  imageStats: ImageStats;
  #selectedTilesMap: Map<number, { tileIds: Set<string>; tileImages: Map<string, string> }>;
  individualImageTileMap: Map<string, { tileImages: Map<string, string> }>;
  appType: 'rgb' | 'english';
  #currentImageIndex: number;

  averageResults: { red: number, green: number, blue: number } = { red: 0, green: 0, blue: 0 };
  modeResults: { red: number, green: number, blue: number } = { red: 0, green: 0, blue: 0 };
  stdDevResults: { red: number, green: number, blue: number } = { red: 0, green: 0, blue: 0 };

  singleAverageResults: { red: number, green: number, blue: number } = { red: 0, green: 0, blue: 0 };
  singleModeResults: { red: number, green: number, blue: number } = { red: 0, green: 0, blue: 0 };
  singleStdDevResults: { red: number, green: number, blue: number } = { red: 0, green: 0, blue: 0 };

  pixelStats: Map<string, {
    average: { red: number, green: number, blue: number },
    mode: { red: number, green: number, blue: number },
    stdDev: { red: number, green: number, blue: number }
  }>;


  listTileCallback: (id: string, index: number) => void;

  pixelList: SelectedList;

  constructor(id: string, appType: 'rgb' | 'english', listTileCallback: (id: string, index: number) => void) {
    this.id = id;
    this.appType = appType;
    this.imageStats = new ImageStats();
    this.listTileCallback = listTileCallback;
    this.container = createElement("div", {
      uniqueIdPrefix: this.id,
      id: "results-container",
      addStyle: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }
    });

    createElement("h2", {
      uniqueIdPrefix: this.id,
      id: "results-label",
      textContent: "Image Results",
      addClass: "typo_title-title2",
      appendTo: this.container
    });

    this.pixelList = new SelectedList({ uniqueIdPrefix: this.id, id: "pixel-list", theme: 'light', options: [] });
    this.pixelList.render(this.container);

    this.individualImageTileMap = new Map();
  }

  init(): void {
    console.log('init results');

    // Reset all properties
    this.imageStats = new ImageStats();
    this.#selectedTilesMap = new Map();
    this.individualImageTileMap = new Map();

    this.averageResults = { red: 0, green: 0, blue: 0 };
    this.modeResults = { red: 0, green: 0, blue: 0 };
    this.stdDevResults = { red: 0, green: 0, blue: 0 };

    this.singleAverageResults = { red: 0, green: 0, blue: 0 };
    this.singleModeResults = { red: 0, green: 0, blue: 0 };
    this.singleStdDevResults = { red: 0, green: 0, blue: 0 };

    this.pixelStats = new Map();

    this.pixelList.selectionListItems = [];
  }

  set selectedTiles(selectedTilesMap: Map<number, { tileIds: Set<string>; tileImages: Map<string, string> }>) {
    this.#selectedTilesMap = selectedTilesMap;
  }

  get selectedTiles(): Map<number, { tileIds: Set<string>; tileImages: Map<string, string> }> {
    return this.#selectedTilesMap;
  }

  set currentImageIndex(index: number) {
    this.#currentImageIndex = index;
  }

  get currentImageIndex(): number {
    return this.#currentImageIndex;
  }

  async renderRGBResults(): Promise<void> {
    // Clear the current results

    //clear the pixelList
    this.pixelList.selectionListItems = [];

    console.count('rendering results');

    const ids = Array.from(this.pixelStats.keys()).sort((a, b) => {
      const aIndex = parseInt(a.split('_')[0]);
      const bIndex = parseInt(b.split('_')[0]);

      return aIndex - bIndex;
    });

    let count = 0;
    let lastMainImageId = null;
    for (const id of ids) {

      const mainImageId = id.split('_')[0];
      const imageStat = this.pixelStats.get(id)
      if (imageStat) {
        const listItemText = createElement('div', {
          addStyle: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
          },
          addChildren: [
            ...(mainImageId !== lastMainImageId ? [
              createElement('span', {
                addStyle: {
                  fontWeight: 'bold',
                },
                innerText: `Image ${+mainImageId + 1}`,
              }),
            ] : []),
            ...(this.appType === 'rgb' ? [
              createElement('span', {
                innerText: `Mode: ${imageStat.mode.red}, ${imageStat.mode.green}, ${imageStat.mode.blue}`,
              }),
              createElement('span', {
                innerText: `Std Dev: ${imageStat.stdDev.red}, ${imageStat.stdDev.green}, ${imageStat.stdDev.blue}`,
              })
            ] : [
              createElement('span', {
                innerText: `Mode: ${convertRGBValuesToEnglishNames(imageStat.mode.red, imageStat.mode.green, imageStat.mode.blue)}`,
              }),
              createElement('span', {
                innerText: `Std Dev: ${imageStat.stdDev.red}, ${imageStat.stdDev.green}, ${imageStat.stdDev.blue}`,
              })
            ]),
          ]
        });

        const modeColor = `rgb(${imageStat.mode.red}, ${imageStat.mode.green}, ${imageStat.mode.blue})`;
        const colorImage = createElement('div', {
          addStyle: {
            width: '40px',
            height: '40px',
            backgroundColor: modeColor,
            marginLeft: '10px',
          }
        });

        const container = createElement('div', {
          addStyle: {
            display: 'flex',
            alignItems: 'center',
          }
        });

        container.appendChild(listItemText);
        container.appendChild(colorImage);

        const listItem = createElement('li', {
          id: id + '_list_item',
          addStyle: {
            height: 'auto',
          },
          onclick: () => {
            //get the number in the beginning of the id
            const index = parseInt(id.split('_')[0]);
            //remove the number and underscore from the id
            const newId = id.substring(id.indexOf('_') + 1);
            this.listTileCallback(newId, index);
          },
          onkeyup: (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              //get the number in the beginning of the id
              const index = parseInt(id.split('_')[0]);
              //remove the number and underscore from the id
              const newId = id.substring(id.indexOf('_') + 1);
              //get the next child element in the list
              const nextElement = document.getElementById(`${id}_list_item`).nextElementSibling;
              // get the previous child element in the list
              const previousElement = document.getElementById(`${id}_list_item`).previousElementSibling;

              // Store the next and previous id
              const nextElementId = nextElement ? nextElement.id : null;
              const previousElementId = previousElement ? previousElement.id : null;

              this.listTileCallback(newId, index)

              //after 1 second focus on the next element in the list
              setTimeout(() => {
                const nextElement = nextElementId ? document.getElementById(nextElementId) : null;
                const previousElement = previousElementId ? document.getElementById(previousElementId) : null;
                console.log('next element', nextElement)
                console.log('previous element', previousElement)
                if (nextElement) {
                  console.log('next element', nextElement)
                  nextElement.tabIndex = 0;
                  nextElement.focus();
                } else if (previousElement) {
                  console.log('previous element', previousElement)
                  previousElement.tabIndex = 0;
                  previousElement.focus();
                }
              }, 1000)
            }
            //if left or right arrow

            if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
              // get all the list item ids
              const listIds = Array.from(document.querySelectorAll('li')).map((li) => {
                if (li.innerText.includes('Image')) {
                  return li.id
                }
                return undefined;
              }).filter((id) => id !== undefined);

              // get the first number from the id
              const currentIndex = parseInt(id.split('_')[0]);

              // Find the next image section
              let nextImageId = null;
              let previousImageId = null;

              nextImageId = listIds.sort((a, b) => parseInt(a.split('_')[0]) - parseInt(b.split('_')[0])).find((id) => parseInt(id.split('_')[0]) > currentIndex);
              previousImageId = listIds.sort((a, b) => parseInt(b.split('_')[0]) - parseInt(a.split('_')[0])).find((id) => parseInt(id.split('_')[0]) < currentIndex);

              if (event.key === "ArrowRight" && nextImageId) {
                const nextElement = document.getElementById(nextImageId);
                nextElement.focus();
              } else if (event.key === "ArrowLeft" && previousImageId) {
                const previousElement = document.getElementById(previousImageId);
                previousElement.focus();
              }
            }

          },
          onmouseenter: () => {
            const index = parseInt(id.split('_')[0]);
            if (index === this.currentImageIndex) {
              const newId = id.substring(id.indexOf('_') + 1);
              const button = document.getElementById(newId);
              if (button) {
                button.style.border = '2px solid yellow';
              }
            }
          },
          onfocus: () => {
            const index = parseInt(id.split('_')[0]);
            const newId = id.substring(id.indexOf('_') + 1);

            if (index === this.currentImageIndex) {
              const button = document.getElementById(newId);
              if (button) {
                button.style.border = '2px solid yellow';
              }
            }
          },
          // on mouseleave or blur, revert the tile to the original style
          onmouseleave: () => {
            const index = parseInt(id.split('_')[0]);
            if (index === this.currentImageIndex) {
              const newId = id.substring(id.indexOf('_') + 1);
              const tile = document.getElementById(newId);
              if (tile) {
                tile.style.border = "1px solid rgba(0, 0, 0, 0.2)"
              }
            }
          },
          onblur: () => {
            const index = parseInt(id.split('_')[0]);
            if (index === this.currentImageIndex) {
              const newId = id.substring(id.indexOf('_') + 1);
              const tile = document.getElementById(newId);
              if (tile) {
                tile.style.border = "1px solid rgba(0, 0, 0, 0.2)"
              }
            }
          }
        });

        listItem.appendChild(container);

        this.pixelList.addItem(listItem, count);
        count++;

        //Update lastMainImageId
        lastMainImageId = mainImageId;
      }
    }
  }

  async updateIndividualImageTileMap(): Promise<void> {
    // Reset the map
    this.individualImageTileMap = new Map();

    // Iterate over the selectedTiles Map
    this.selectedTiles.forEach((value, key) => {
      // Convert the key to a string and store it as mainImageId
      const mainImageId = key.toString();

      // Create a new entry in the individualImageTileMap with mainImageId as the key
      // and an object with a new Map as the value
      this.individualImageTileMap.set(mainImageId, {
        tileImages: new Map()
      });

      // Iterate over the tileImages Map from the current value of selectedTiles
      value.tileImages.forEach((imageSrc, tileId) => {
        // Retrieve the current mainImageId entry from individualImageTileMap
        const imageData = this.individualImageTileMap.get(mainImageId);

        // Add a new entry to the tileImages Map of the current imageData
        // using tileId as the key and imageSrc as the value
        if (!imageData) return;
        imageData.tileImages.set(tileId, imageSrc);
      });
    });
  }


  async calculateStatsForAllPixels(): Promise<void> {
    // Initialize a new Map to hold the statistics for each pixel
    this.pixelStats = new Map();

    // Iterate over each image in the individualImageTileMap
    for (const [mainImageId, imageData] of this.individualImageTileMap.entries()) {
      // Iterate over each tile image within the current main image
      for (const [tileId, imageSrc] of imageData.tileImages.entries()) {
        // Combine mainImageId and tileId to form a unique key for every pixel in each image
        const uniquePixelId = `${mainImageId}_${tileId}`;

        // Check if the results for this pixel are already in the cache
        // If not, calculate the results
        const img = new Image();
        img.src = imageSrc;

        // Wait for the image to load
        await new Promise((resolve) => {
          img.onload = () => {
            resolve(null);
          };
        });

        // Calculate the average, mode, and standard deviation for the current image
        const average = await this.imageStats.calculateAverageForSingleImage(img);
        const mode = await this.imageStats.calculateModeForSingleImage(img);
        const stdDev = await this.imageStats.calculateStdDevForSingleImage(img);

        // Store the statistics for the current pixel in the pixelStats Map
        this.pixelStats.set(uniquePixelId, {
          average,
          mode,
          stdDev,
        });

      }
    }
  }



  saveDataToCSV(contentMap: Map<number, string>, dataType: 'rgb' | 'english'): void {
    if (!contentMap) {
      console.error('contentMap is undefined');
      return;
    }

    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "red,green,blue,colorName,content\n";

    this.pixelStats.forEach((value, key) => {
      const imageNumber = parseInt(key.split('_')[0]);
      const content = contentMap.get(0);

      if (content !== undefined) { // check if content exists before using it
        // Append each row to the CSV content
        csvContent += `${value.mode.red},${value.mode.green},${value.mode.blue},${convertRGBValuesToEnglishNames(value.mode.red, value.mode.green, value.mode.blue)},${content}\n`;
      } else {
        // Handle the case where content is undefined, e.g., skip this iteration or use a default value
        csvContent += `${value.mode.red},${value.mode.green},${value.mode.blue},${convertRGBValuesToEnglishNames(value.mode.red, value.mode.green, value.mode.blue)},\n`;
      }
    });

    // Create a link to download the CSV file
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "pixel_stats.csv");
    link.click();
  }

  render(parent: HTMLDivElement): void {
    parent.appendChild(this.container);
  }
}

