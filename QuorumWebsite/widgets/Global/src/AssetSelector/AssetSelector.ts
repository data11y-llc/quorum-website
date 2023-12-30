import { Accordion } from "./AssetAccordion";
import { Header } from "../UiKit/molecules/header/header"
import { createElement, updateElement } from "../util/helper";
import { assetJson, AssetInfo } from './assetJson';
import { Button } from "../UiKit/atoms/buttons/buttons";
import { AudioPlayer } from "./audioPlayer";
import { csvDisplay } from "./csvDisplay";
import { MSDE_BASE_URL } from "../util/versionNumbers";
import { HelpModal } from "./HelpModal";
import { ThemeSettingsModal } from "../UiKit/molecules/modals/themeSwitcher/themeSwitcher";
import { formatSVG } from "../UiKit/atoms/icons/showIcons";
import { helpIcon } from "../UiKit/atoms/icons/icons";

export enum AssetType {
  Image = 'Images',
  Sound = 'Sounds',
  CSV = 'CSVs',
}

type assetTypes = 'images' | 'sounds' | 'csvs';

export class AssetSelector {
  mainContainer: HTMLDivElement;
  header: Header;
  contentContainer: HTMLDivElement;
  imageNamesLog: string = '';
  imageHolder: HTMLDivElement;
  cachedAssets: { [key: string]: string } = {}; // Add this line
  private audioPlayer: HTMLAudioElement = createElement('audio', { preload: 'auto' }) as HTMLAudioElement;
  accordion: Accordion;
  leftContainer: HTMLDivElement;
  rightContainer: HTMLDivElement;
  assetSpecialActionDisplay: HTMLDivElement;
  topRightContainer: HTMLDivElement;
  topTitle: HTMLHeadingElement
  copyButton: Button
  id: string
  categoryHeader: HTMLHeadingElement;
  modal: ThemeSettingsModal<AssetSelector>;

  csvDisplay: csvDisplay;

  constructor(id: string) {
    this.id = id;
    this.mainContainer = document.getElementById(id) as HTMLDivElement;

    if (!this.mainContainer) {
      console.error(`Failed to find element with id: ${id}`);
      return;
    }



    this.mainContainer = updateElement(this.mainContainer, { addClass: 'ag-main-container' }) as HTMLDivElement;
    this.header = new Header({ theme: 'light', title: 'Asset Selector', uniqueId: id });
    this.modal = new ThemeSettingsModal({ id: 'themeSettingsModal', uniqueIdPrefix: this.id, theme: 'light', comingFrom: this });
    this.header.settingsButton.onClick(() => this.modal.open());
    this.contentContainer = createElement('div', { addClass: 'asset-getter-content-container' });

    const newSettingsIcon = formatSVG(helpIcon, 'icon-neutral__black-size-2');
    if (!newSettingsIcon) throw new Error('newSettingsIcon is null');
    newSettingsIcon.style.height = 'inherit';
    newSettingsIcon.style.width = '30px';
    this.header.settingsButton.button.innerHTML = newSettingsIcon.outerHTML;
    this.header.settingsButton.button.ariaLabel = 'Open Instructions';

    this.leftContainer = createElement('div', { addClass: 'asset-getter-left-container' })
    this.rightContainer = createElement('div', { addClass: 'asset-getter-right-container' });
    this.categoryHeader = createElement('h2', { innerText: '', addClass: 'typo_title-title3', addStyle: { marginBottom: '0', paddingBottom: '0' } });
    this.imageHolder = createElement('div', { addClass: 'asset-getter-image-getter', role: 'group' });
    this.contentContainer.appendChild(this.audioPlayer);
    this.accordion = new Accordion({
      uniqueId: id, id: 'accordion', json: assetJson, callbackLeaf: (json: AssetInfo[], assetType: 'images' | 'sounds' | 'csvs', category: string) => {
        this.toggleAndLoadAssets(category, json, assetType);
      }
    });
    this.topRightContainer = createElement('div', {
      addClass: 'asset-getter-top-right-container',
      appendTo: this.rightContainer
    }) as HTMLDivElement;

    this.topTitle = createElement('h2', {
      addClass: 'asset-getter-top-title',
      innerText: 'Instructions',
      appendTo: this.topRightContainer
    }) as HTMLDivElement;

    this.copyButton = new Button({ text: 'Copy', title: 'Copy', className: 'btn-small-link-var1', uniqueIdPrefix: id, id: 'copy-button' })
    this.copyButton.getElement().style.display = 'none';
    this.copyButton.getElement().style.border = '1px dashed #000000';
    this.copyButton.render(this.topRightContainer);

    this.assetSpecialActionDisplay = createElement('div', {
      uniqueIdPrefix: id,
      textContent: 'Use this tool to get media assets to use in your programs. Explore the tabs to view your desired image, sound, or CSV. When you click on the asset, it automatically copies the asset.',
      id: 'asset-special-action-display',
      addClass: 'asset-getter-special-action-display',
      appendTo: this.rightContainer,
      addStyle: {
        backgroundColor: 'white',
      },
    }) as HTMLDivElement;
    this.accordion.createItem(assetJson);
    new HelpModal(id);
    this.render()
  }

  async toggleAndLoadAssets(category: string, assetData: AssetInfo[], assetType: assetTypes) {
    this.imageHolder.innerHTML = ''; // Clear previous images
    this.assetSpecialActionDisplay.innerHTML = '';
    this.assetSpecialActionDisplay.style.backgroundColor = '';
    this.topTitle.innerText = '';
    this.categoryHeader.innerText = category + ` (${assetData.length} ${assetType})`;
    this.copyButton.getElement().style.display = 'none';

    for (const asset of Object.values(assetData)) {
      const { assetWrapper, copiedText, assetButton, assetIcon, assetName } = this.createAssetElements();

      // Handle asset types
      await this.handleAssetType(assetType, asset, assetIcon, assetName, assetButton);

      assetButton.addEventListener('click', async () => {
        this.handleAssetClick(assetType, asset, copiedText);
      });

      this.imageHolder.appendChild(assetWrapper);
    }
  }

  // Helper Functions
  createAssetElements() {
    const assetWrapper = createElement('div', { className: 'asset-wrapper' });
    const copiedText = createElement('div', { innerText: 'Copied URL', addClass: 'copied-text', addStyle: { visibility: 'hidden' } });
    const assetButton = createElement('button', { className: 'asset-button' });
    const assetIcon = createElement('img', { addClass: 'asset-icon', src: '', alt: '' });
    const assetName = createElement('span', { addClass: 'asset-name', innerText: '' });

    assetButton.appendChild(assetIcon);
    assetWrapper.append(copiedText, assetButton, assetName);

    return { assetWrapper, copiedText, assetButton, assetIcon, assetName };
  }

  async handleAssetType(assetType: assetTypes, asset: AssetInfo, assetIcon: HTMLImageElement, assetName: HTMLSpanElement, assetButton: HTMLButtonElement) {
    switch (assetType) {
      case 'images':
        await this.handleImageAsset(asset, assetIcon);
        break;
      case 'sounds':
        await this.handleSoundAsset(asset, assetIcon, assetName, assetButton);
        break;
      case 'csvs':
        await this.handleCSVAsset(asset, assetIcon, assetName);
        break;
    }
    assetName.innerText = asset.name;
  }

  async handleAssetClick(assetType: assetTypes, asset: AssetInfo, copiedText: HTMLDivElement) {
    switch (assetType) {
      case 'images':
        this.handleImageClick(asset, copiedText);
        break;
      case 'sounds':
        this.handleSoundClick(asset, copiedText);
        break;
      case 'csvs':
        this.handleCSVClick(asset);
        break;
    }
  }

  async handleImageAsset(asset: AssetInfo, assetIcon: HTMLImageElement) {
    const imageURL = await this.fetchAsset(AssetType.Image, asset.url);
    assetIcon.src = imageURL;
    assetIcon.alt = asset.name;
    assetIcon.ariaLabel = asset.description;
    assetIcon.setAttribute('aria-label', asset.description);

  }

  async handleSoundAsset(asset: AssetInfo, assetIcon: HTMLImageElement, assetName: HTMLSpanElement, assetButton: HTMLButtonElement) {
    const imageURL = await this.fetchAsset(AssetType.Image, 'speaker.png');
    const soundURL = await this.fetchAsset(AssetType.Sound, asset.url);
    assetIcon.src = imageURL;
    assetIcon.alt = asset.name;
    assetIcon.ariaLabel = `Listen to ${asset.description}`;

    // Create a new HTMLAudioElement to fetch sound duration
    const localAudioPlayer = new Audio();
    localAudioPlayer.src = soundURL;

    localAudioPlayer.addEventListener('durationchange', function() {
      assetName.innerText = `${asset.name} (${localAudioPlayer.duration.toFixed(2)}s)`;
    });

    assetButton.setAttribute('aria-label', asset.description);
  }

  async handleCSVAsset(asset: AssetInfo, assetIcon: HTMLImageElement, assetName: HTMLSpanElement) {
    const imageURL = await this.fetchAsset(AssetType.Image, 'csvIcon.png');

    assetIcon.src = imageURL;
    assetIcon.alt = asset.name;
    assetIcon.ariaLabel = 'Load' + asset.description;
    assetName.innerText = `${asset.name}`;
  }

  async handleImageClick(asset: AssetInfo, copiedText: HTMLDivElement) {
    const assetURL = `Images/${asset.url}`;
    console.log(`Image clicked: ${asset.name}`);
    //write additional code here if needed
    this.assetSpecialActionDisplay.innerHTML = '';
    const image = createElement('img', { src: await this.fetchAsset(AssetType.Image, asset.url), addClass: 'asset-getter-special-action-display-image' });
    image.alt = asset.name;
    image.ariaLabel = asset.description;

    this.assetSpecialActionDisplay.appendChild(image);
    this.topTitle.innerText = asset.name;
    this.copyButton.getElement().style.display = 'block';
    this.copyButton.getElement().textContent = 'Copy URL';
    this.copyButton.getElement().ariaLabel = `Copy ${asset.name} Image URL path to clipboard`;
    this.copyButton.onClick(() => this.copyURLToClipboard(assetURL, copiedText));
  }

  async handleSoundClick(asset: AssetInfo, copiedText: HTMLDivElement) {
    const assetURL = await this.fetchAsset(AssetType.Sound, asset.url);
    this.assetSpecialActionDisplay.innerHTML = '';

    const audioPlayer = new AudioPlayer(assetURL, this.id, asset);

    this.assetSpecialActionDisplay.appendChild(audioPlayer.getElement());
    this.topTitle.innerText = '';
    this.copyButton.getElement().style.display = 'block';
    this.copyButton.getElement().textContent = 'Copy URL';
    this.copyButton.getElement().ariaLabel = `Copy ${asset.name} Sound URL path to clipboard`;
    this.copyButton.onClick(() => this.copyURLToClipboard(`Sounds/${asset.url}`, copiedText));
  }

  async handleCSVClick(asset: AssetInfo) {
    const assetURL = await this.fetchAsset(AssetType.CSV, asset.url, asset.category);
    this.assetSpecialActionDisplay.innerHTML = '';

    // this.downloadCSV(csvURL, asset.name);
    this.csvDisplay = new csvDisplay(assetURL, this.id, asset);
    this.assetSpecialActionDisplay.appendChild(this.csvDisplay.getElement());
    this.topTitle.innerText = asset.name;
    this.copyButton.getElement().style.display = 'block';
    this.copyButton.getElement().textContent = 'Download';
    this.copyButton.getElement().ariaLabel = 'Download CSV';
    this.copyButton.onClick(() => this.downloadCSV(assetURL, asset.name));
  }

  async copyURLToClipboard(assetURL: string, copiedText: HTMLDivElement) {
    try {
      await navigator.clipboard.writeText(assetURL);
      copiedText.style.visibility = 'visible';
      setTimeout(() => {
        copiedText.style.visibility = 'hidden';
      }, 2000);
    } catch (err) {
      console.error('Failed to copy URL: ', err);
    }
  }

  downloadCSV(csvURL: string, csvName: string) {
    fetch(csvURL)
      .then(response => response.blob())
      .then(blob => {
        const csvLink = document.createElement('a');
        csvLink.href = URL.createObjectURL(blob);
        csvLink.style.display = 'none';
        csvLink.download = csvName;
        csvLink.click();
        csvLink.remove();
      })
      .catch(error => console.error("Failed to download CSV:", error));
  }

  async fetchAsset(type: AssetType, path: string, category?: string): Promise<string> {
    console.log(`type: ${type}, path: ${path}, category: ${category}`);
    let cacheKey = `${MSDE_BASE_URL}/msde-deploy/CSP/Assets/${type}/${path}`;

    // If a category is provided (useful for CSVs)
    if (category) {
      cacheKey = `https://data11y.com/msde-deploy/CSP/Assets/${type}/${category}/${path}`;
    }

    // Check if the asset is cached
    if (this.cachedAssets[cacheKey]) {
      return this.cachedAssets[cacheKey];
    }

    try {
      const response = await fetch(cacheKey);
      if (response.ok) {
        const blob = await response.blob();
        const objectURL = URL.createObjectURL(blob);

        // Cache the asset
        this.cachedAssets[cacheKey] = objectURL;

        return objectURL;
      } else {
        console.error(`Failed to fetch asset: ${cacheKey}`);
        return '';
      }
    } catch (error) {
      console.error(`An error occurred while fetching the asset: ${error}`);
      return '';
    }
  }

  playSound(soundPath: string) {
    this.audioPlayer.src = soundPath;
    this.audioPlayer.play();
  }

  switchTheme(theme: string) {
    //needs this to work with the theme modal which is now an instruction modal
    console.log(`Switching theme to ${theme}`);
  }

  render() {
    this.header.render(this.mainContainer);
    this.mainContainer.appendChild(this.contentContainer);
    this.contentContainer.appendChild(this.leftContainer);
    this.contentContainer.appendChild(this.rightContainer);
    this.accordion.render(this.leftContainer);

    this.rightContainer.appendChild(this.categoryHeader);
    this.rightContainer.appendChild(this.imageHolder);
  }
}

