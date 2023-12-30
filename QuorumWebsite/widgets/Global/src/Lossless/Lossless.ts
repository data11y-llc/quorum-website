import { Dropdown } from "../UiKit/molecules/dropdown/dropdown";
import { Header } from "../UiKit/molecules/header/header";
import { ThemeSettingsModal } from "../UiKit/molecules/modals/themeSwitcher/themeSwitcher";
import { UiKitColors } from "../util/UiKit";
import { createElement, updateElement } from "../util/helper";
import { Calculations } from "./Calculations";
import { MapTextInput } from "./MapIconInput";
import { HelpModal } from "./HelpModal";
import { formatSVG } from "../UiKit/atoms/icons/showIcons";
import { helpIcon } from "../UiKit/atoms/icons/icons";

const sentenceOptions = {
  'Text Option 1': 'Pitter_patter_pitter_patter_listen_to_the_rain_pitter_patter_pitter_patter_on_the_window_pane',
  'Text Option 2': 'A_tutor_who_tooted_the_flute_Tried_to_tutor_two_tooters_to_toot_Said_the_two_to_their_tutor,_"Is_it_harder_to_toot_Or_to_tutor_two_tooters_to_toot?"',
  'Text Option 3': 'She_sells_sea_shells_on_the_sea_shore_The_shells_that_she_sells_are_sea_shells_I\'m_sure_So_if_she_sells_sea_shells_on_the_sea_shore_I\'m_sure_that_the_shells_are_sea_shore_shells_',
  'Text Option 4': 'I_know_an_old_lady_who_swallowed_a_bird_How_absurd!_She_swallowed_a_bird!_She_swallowed_the_bird_to_catch_the_spider_That_wriggled_and_jiggled_and_tickled_inside_her_She_swallowed_the_spider_to_catch_the_fly_I_don\'t_know_why_she_swallowed_a_fly_Perhaps_she\'ll_die',
  'Text Option 5': 'Pease_porridge_hot_Pease_porridge_cold_Pease_porridge_in_the_pot_Nine_days_old._Some_like_it_hot_Some_like_it_cold_Some_like_it_in_the_pot_Nine_days_old.',
  'Text Option 6': 'Aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
}

export class Lossless {
  #container: HTMLDivElement;
  #header: Header;
  #content: HTMLDivElement;
  #uniqueId: string;
  #leftContainer: HTMLDivElement;
  #rightContainer: HTMLDivElement;
  #originalText: string;
  #sentenceContainer: HTMLDivElement;
  #calculationsContainer: HTMLDivElement;

  #sentenceChangeDropdown: Dropdown;

  #modal: ThemeSettingsModal<Lossless>
  mapTextInput: MapTextInput;

  constructor(id: string) {
    // Initialize Basic Properties
    this.#uniqueId = id;
    this.#container = this.createContainer(id);

    // Initialize and Configure Header
    this.#header = new Header({ title: 'Text Compression', theme: 'light', uniqueId: id });
    this.#header.settingsButton.onClick(() => this.#modal.open());
    this.#header.render(this.#container);


    // Create Content and Container Divs
    this.#content = this.createContentDiv();
    this.#leftContainer = this.createLeftContainer();
    this.#rightContainer = this.createRightContainer();

    // Initialize Dropdown and Sentence Change
    this.#sentenceChangeDropdown = new Dropdown({
      options: Object.keys(sentenceOptions),
      uniqueIdPrefix: this.uniqueId,
      label: 'Choose Text',
      id: 'sentenceChangeDropdown',
    });
    this.initializeSentenceChangeDropdown();

    // Create and Populate Sentence and Calculation Containers
    const { container: sentenceContainer, content } = this.createStyledContainer('Compressed Text', sentenceOptions["Text Option 1"], UiKitColors.quorum.blue._100, 'black');
    this.#sentenceContainer = content;
    this.#leftContainer.appendChild(sentenceContainer);

    this.#sentenceChangeDropdown.render(this.#leftContainer);

    const { container: outerCalcContainer, content: calcContent } = this.createStyledContainer('Compression Details', '', 'black', 'white');
    this.#calculationsContainer = calcContent;
    this.#leftContainer.appendChild(outerCalcContainer);

    // Append to Main Content
    this.#content.appendChild(this.#leftContainer);
    this.#content.appendChild(this.#rightContainer);
    this.#container.appendChild(this.#content);

    // Modal and Text Input Initializations
    this.#modal = new ThemeSettingsModal({ id: 'themeSettingsModal', uniqueIdPrefix: this.uniqueId, theme: 'light', comingFrom: this });
    this.mapTextInput = new MapTextInput(this.uniqueId, this.#rightContainer, this.handleIconValueMapChange.bind(this));

    // Metrics and Calculations
    this.createMetricsDisplay();
    this.#originalText = sentenceOptions["Text Option 1"];
    this.makeCalculations(this.#sentenceContainer.textContent || '', this.mapTextInput.iconValueMap);

    const newSettingsIcon = formatSVG(helpIcon, 'icon-neutral__black-size-2');
    if (!newSettingsIcon) throw new Error('newSettingsIcon is null');
    newSettingsIcon.style.height = 'inherit';
    newSettingsIcon.style.width = '30px';
    this.#header.settingsButton.button.innerHTML = newSettingsIcon.outerHTML;
    this.#header.settingsButton.button.ariaLabel = 'Open Instructions';

    new HelpModal(this.uniqueId);
  }


  // Helper method to initialize dropdown changes
  private initializeSentenceChangeDropdown() {
    this.#sentenceChangeDropdown.addOnChangeListener((value) => {
      this.#sentenceContainer.textContent = sentenceOptions[value];
      this.#originalText = sentenceOptions[value];
      this.mapTextInput.liveRegion.textContent = 'Original Sentence: ' + sentenceOptions[value];
      this.handleIconValueMapChange(this.mapTextInput.iconValueMap);
    });
  }

  // Create Left Container - Repeat this for other elements if you like
  private createLeftContainer(): HTMLDivElement {
    return createElement('div', {
      id: 'leftContainer',
      uniqueIdPrefix: this.uniqueId,
      addStyle: {
        flex: '1',
        display: 'flex',
        flexDirection: 'column',
        width: '1rem',
        boxSizing: 'border-box',
        height: 'fit-content',
        rowGap: '16px',
      },
    });
  }

  // Create Right Container - Repeat this for other elements if you like
  private createRightContainer(): HTMLDivElement {
    return createElement('div', {
      id: 'rightContainer',
      uniqueIdPrefix: this.uniqueId,
      addStyle: {
        flex: '1',
        display: 'flex',
        flexDirection: 'column',
        width: '50%',
        boxSizing: 'border-box',
        height: 'fit-content',
        rowGap: '16px',
      },
    });
  }


  createMetricsDisplay() {
    ['Compressed Size', 'Dictionary Size', 'Total Size', 'Original Size', 'Compression Percentage'].forEach(metric => {
      const metricElement = createElement('p', {
        id: `${metric.split(' ').join('')}-metrics`,
        addStyle: {
          fontFamily: 'Montserrat, sans-serif',
          margin: '0'
        },
      });
      const labelSpan = createElement('span', {
        addStyle: { fontWeight: 'bold' },
      });
      const valueSpan = createElement('span', {
        addStyle: { fontWeight: 'normal' },
      });

      labelSpan.textContent = `${metric}: `;
      metricElement.appendChild(labelSpan);
      valueSpan.dataset.metricName = metric;
      metricElement.appendChild(valueSpan);
      this.#calculationsContainer.appendChild(metricElement);
    });
  }
  get container(): HTMLDivElement {
    return this.#container;
  }

  get uniqueId(): string {
    return this.#uniqueId;
  }

  createContainer(loaderId: string): HTMLDivElement {
    return updateElement(document.getElementById(loaderId) as HTMLDivElement, {
      addStyle: {
        display: 'flex',
        flexWrap: 'wrap',
        width: '96%',
        minWidth: 'fit-content',
        alignContent: 'flex-start',
        borderRadius: '8px',
        boxSizing: 'border-box',
        backgroundColor: UiKitColors.neutral.white,
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        rowGap: '16px',
      },
    }) as HTMLDivElement;
  }

  createContentDiv(): HTMLDivElement {
    return createElement('div', {
      addStyle: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap', // Prevents flex
        boxSizing: 'border-box',
        width: '100%',
        padding: '32px',
        rowGap: '16px',
        columnGap: '32px',
      },
    }) as HTMLDivElement;
  }

  createOptionsDiv(): HTMLDivElement {
    //create div that holds 3 divs of equal width
    return createElement('div', {
      addStyle: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        width: '100%',
        boxSizing: 'border-box',
        justifyContent: 'space-between',
        height: 'fit-content',
      },
    }) as HTMLDivElement;
  }


  handleIconValueMapChange(iconValueMap: { [key: string]: { icon: string, value: string } }) {
    let mutableSentence = this.#originalText;

    // Filtering out entries with empty 'value'
    const filteredMap = Object.fromEntries(Object.entries(iconValueMap).filter(([, { value }]) => value));

    for (const { icon, value } of Object.values(filteredMap)) {
      const regex = new RegExp(value, 'g');
      mutableSentence = mutableSentence.replace(regex, icon);
    }

    this.#sentenceContainer.textContent = mutableSentence;
    this.mapTextInput.liveRegion.textContent = 'Final Sentence: ' + mutableSentence;

    this.makeCalculations(mutableSentence, iconValueMap);
  }

  makeCalculations(newSentence: string, replacements: { [key: string]: { icon: string, value: string } }) {
    const compressedSize = Calculations.compressedTextSize(newSentence);
    const dictionarySize = Calculations.dictionarySize(replacements);
    const totalSize = Calculations.totalSize(newSentence, replacements);
    const originalSize = Calculations.originalTextSize(this.#originalText);
    const compressionPercentage = Calculations.compressionPercentage(
      this.#originalText,
      newSentence,
      replacements
    );

    // Updating metrics display
    const metrics = [
      { name: 'Compressed Size', value: compressedSize },
      { name: 'Dictionary Size', value: dictionarySize },
      { name: 'Total Size', value: totalSize },
      { name: 'Original Size', value: originalSize },
      { name: 'Compression Percentage', value: compressionPercentage },
    ];

    metrics.forEach(({ name, value }) => {
      const metricElement = this.#calculationsContainer.querySelector(`#${name.split(' ').join('')}-metrics`);
      if (metricElement) {
        const valueSpan = metricElement.querySelector('span:last-child') as HTMLSpanElement; // Get the second span, which is for values
        if (valueSpan) {
          valueSpan.textContent = `${value}`;

          if (name === 'Compression Percentage') {
            let color;
            if (value > 0) {
              color = 'green';
            } else if (value < 0) {
              color = 'red';
            } else {
              color = 'black';
            }
            //add a % sign to the end of the text
            valueSpan.textContent += '%';
            valueSpan.style.color = color;  // Directly set the color without nesting another span.
          }
        }
      }
    });
  }

  // Helper function to create a stylized container
  createStyledContainer(headerText: string, contentText: string, headerBackgroundColor: string, fontColor: string): { container: HTMLDivElement, header: HTMLHeadingElement, content: HTMLDivElement } {
    let headerId = headerText.trim();
    //make header camelCase
    headerId = headerId.charAt(0).toLowerCase() + headerId.slice(1);
    headerId = headerId.replace(/\s/g, '');

    const container = createElement('div', {
      uniqueIdPrefix: this.uniqueId,
      id: headerId,
      addStyle: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        backgroundColor: '#f2f2f2',
        boxSizing: 'border-box',
        rowGap: '16px',
      },
    });

    const header = createElement('h3', {
      uniqueIdPrefix: this.uniqueId,
      id: headerId + 'Header',
      textContent: headerText,
      addStyle: {
        fontFamily: 'Montserrat, sans-serif',
        fontSize: '18px',
        fontWeight: 'bold',
        margin: '0',
        paddingLeft: '16px',
        boxSizing: 'border-box',
        backgroundColor: headerBackgroundColor,
        color: fontColor,
      },
    });

    const content = createElement('div', {
      uniqueIdPrefix: this.uniqueId,
      id: headerId + 'Content',
      textContent: contentText,
      addStyle: {
        fontFamily: 'Montserrat, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        boxSizing: 'border-box',
        padding: '16px',
        rowGap: '16px',
        wordBreak: 'break-all',
      },
      ariaLive: 'polite',
      ariaAtomic: 'true',
    });

    if (headerId === 'CompressionDetails') {
      content.style.minWidth = '200px'; // Set this value to what suits your needs
    }

    container.appendChild(header);
    container.appendChild(content);

    return { container, header, content } as { container: HTMLDivElement, header: HTMLHeadingElement, content: HTMLDivElement };
  }


  createOptionItemDiv(): HTMLDivElement {
    return createElement('div', {
      addStyle: {
        flex: '1',
        maxWidth: '50%',
      },
    }) as HTMLDivElement;
  }

  switchTheme(theme: 'light' | 'dark' | 'high-contrast'): void {

    this.#header.switchTheme(theme);

    //update background color of pixel grid
    if (theme === 'light') {
      this.#container.style.backgroundColor = UiKitColors.neutral.white;
      this.#content.style.borderTop = 'none'
    } else if (theme === 'dark') {
      this.#container.style.backgroundColor = UiKitColors.neutral.grey._75;
      this.#content.style.borderTop = 'none'
    } else if (theme === 'high-contrast') {
      this.#container.style.backgroundColor = UiKitColors.neutral.black;
      this.#content.style.borderTop = '1px solid ' + UiKitColors.neutral.white;
    }

    //make all labels change color
    const labels = this.#container.getElementsByTagName('label');
    for (let i = 0; i < labels.length; i++) {
      const label = labels[i];
      label.style.color = theme === 'light' ? UiKitColors.neutral.black : UiKitColors.neutral.white;
    }
  }
}
